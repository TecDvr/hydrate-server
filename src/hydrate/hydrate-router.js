const express = require('express');
const knex = require('knex');
const { DATABASE_URL } = require('../config');
const { requireAuth } = require('../middleware/basic-auth');
const bcrypt = require('bcryptjs')
const moment = require('moment');

const jsonParser = express.json()
const jsonBodyParser = express.json()
const hydrateRouter = express.Router();

const knexInstance = knex({
    client: 'pg',
    connection: DATABASE_URL,
});

hydrateRouter   
    .route('/api/user')
    .get((req, res) => { //get all users
        knexInstance
            .select('*')
            .from('hydrate_users')
            .then(results => {
                res.json(results)
            })
    })
    .post(jsonParser, (req, res, next) => {  //register new users
        const { username, glasses } = req.body;
        const password = bcrypt.hashSync(req.body.password, 8);
        const newUser = { username, password, glasses };
        const userColumns = [ 'id', 'username', 'glasses' ]
        const quotaColumns = [ 'amount' ]

        knexInstance
            .insert(newUser)
            .into('hydrate_users')
            .returning(userColumns)
            .then(([ user ]) => knexInstance
                .insert({
                user_id: user.id,
                date: 'now()',
                amount: 0
                })
                .into('hydrate_quotas')
                .returning(quotaColumns)
                .then(([ quota ]) => res.status(201)
                .json({
                    ...user,
                    ...quota
                })
                )
            )
    })

hydrateRouter
    .route('/api/user/login')  
    .post(jsonBodyParser, (req, res, next) => { //user login
        const { username, password } = req.body
        const loginUser = { username, password }

        const userColumns = [ 'id', 'username', 'glasses' ]
        const quotaColumns = [ 'amount' ]
        
        for (const [key, value] of Object.entries(loginUser))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
        
        knexInstance
            .from('hydrate_users')
            .where({ username })
            .first()
            .returning(userColumns)
            .then(user => {
                if (!user || !bcrypt.compareSync(password, user.password)) 
                return res.status(400).json({
                    error: 'Incorrect username or password'
                }) 
                
                knexInstance
                    .from('hydrate_quotas')
                    .where({
                        user_id: user.id,
                        date: 'now()'
                    })
                    .select('user_id')
                    .then(rows => {
                        if (rows.length > 0)
                        return res.status(200).json(user)
                        
                        knexInstance
                            .insert({
                                user_id: user.id,
                                date: 'now()',
                                amount: 0
                            })
                            .into('hydrate_quotas')
                            .returning(quotaColumns)
                            .then(([ quota ]) => 
                                res.status(201).json({
                                    ...user,
                                    ...quota
                            }))
                    }) 
            })
            .catch(next)
        })

hydrateRouter
    .route('/api/user/:id') 
    .all(requireAuth)
    .get((req, res, next) => { //display current user profile
        const {id} = req.params;
        knexInstance
            .from('hydrate_users')
            .select('*')
            .where('id', id)
            .first()
            .then(user => {
                res.json(user)
            })
            .catch(next)
    })
    .patch(requireAuth, jsonParser, (req, res, next) => {  //edit water consumption goal
        const { glasses } = req.body
        const glassesUpdate = { glasses }
        const { id } = req.params

        const numberOfValues = Object.values(glassesUpdate).filter(Boolean).length
        if (numberOfValues === 0)
            return res.status(400).json({
            error: { message: `Request body must contain 'glasses'` }
            })

        knexInstance('hydrate_users')
            .where( {id} )
            .update({glasses})
            .then(user => {
                res.status(204).end();
            })
            .catch(next)
    })

hydrateRouter
    .route('/api/user/waterconsumed/:user_id')  
    .all(requireAuth)
    .get((req, res, next) => { //display water consumed/day
        const {user_id} = req.params;
        knexInstance
            .from('hydrate_quotas')
            .select('amount', 'date')
            .where('user_id', user_id)
            .first()
            .then(water => {
                res.json(water)
            })
            .catch(next)
    })
    .patch(requireAuth, jsonParser, (req, res, next) => { //update water consumed
        const { amount } = req.body
        const amountUpdate = { amount }
        const { user_id } = req.params

        const numberOfValues = Object.values(amountUpdate).filter(Boolean).length
        if (numberOfValues === 0)
            return res.status(400).json({
            error: { message: `Request body must contain 'amount'` }
            })

        amountUpdate.user = req.user.id

        knexInstance('hydrate_quotas')
            .where({
                user_id: user_id,
                date: 'now()'
            })
            .update( {amount} )
            .then(amount => {
                res.status(204).end();
            })
            .catch(next)
    })



hydrateRouter
    .route('/api/user/water/week/:user_id')  
    .all(requireAuth)
    .get((req, res, next) => { //display water consumed/day
        const {user_id} = req.params;
        const past = moment().subtract(4, 'days').format("YYYY-MM-DD");
        knexInstance
            .from('hydrate_quotas') 
            .select('amount', 'date')
            .where('user_id', user_id)
            .whereBetween('date', [past, 'now()'])
            .orderBy('date','desc')
            .then(water => {
                res.json(water)
            })
            .catch(next)
    })

// VERSION 2 UPDATE // 
    hydrateRouter
        .route('/api/fact')
        .get((req, res) => { //get all facts
            knexInstance
                .select('fact')
                .from('hydrate_facts')
                .first()
                .then(results => {
                    res.json(results)
                })
        })

    module.exports = hydrateRouter;