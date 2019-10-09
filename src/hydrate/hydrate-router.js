const express = require('express');
const knex = require('knex');
const { DB_URL } = require('../config');
const { requireAuth } = require('../middleware/basic-auth');
const bcrypt = require('bcryptjs')

const jsonParser = express.json()
const jsonBodyParser = express.json()
const hydrateRouter = express.Router();

const knexInstance = knex({
    client: 'pg',
    connection: DB_URL,
});

hydrateRouter   // get all users
    .route('/api/user')
    .get((req, res) => {
        knexInstance
            .select('*')
            .from('hydrate_users')
            .then(results => {
                res.json(results)
            })
    })
    .post(jsonParser, (req, res, next) => {  // register new users
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
    .route('/api/user/login')  // user login
    .post(jsonBodyParser, (req, res, next) => {
        const { username, password } = req.body
        const loginUser = { username, password }
        
        for (const [key, value] of Object.entries(loginUser))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
        
        knexInstance
            .from('hydrate_users')
            .where({ username })
            .first()
            .then(user => {
                if (!user || !bcrypt.compareSync(password, user.password)) 
                    return res.status(400).json({
                        error: 'Incorrect username or password'
                    })
                res.json(user)
            })
            .catch(next)
    })

hydrateRouter
    .route('/api/user/:id') // display current user profile
    .all(requireAuth)
    .get((req, res, next) => {
        const {id} = req.params;
        knexInstance
            .from('hydrate_users')
            .select('*')
            .where('id', id)
            .then(user => {
                res.json(user)
            })
            .catch(next)
    })
    .patch(requireAuth, jsonParser, (req, res, next) => {  // edit water consumption goal
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
    .route('/api/user/waterconsumed/:user_id')  // display water consumed/day
    .all(requireAuth)
    .get((req, res, next) => {
        const {user_id} = req.params;
        knexInstance
            .from('hydrate_quotas')
            .select('amount')
            .where('user_id', user_id)
            .first()
            .then(water => {
                res.json(water)
            })
            .catch(next)
    })
    .patch(requireAuth, jsonParser, (req, res, next) => { // update water consumed
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
            .where( {user_id} )
            .update( {amount} )
            .then(amount => {
                res.status(204).end();
            })
            .catch(next)
    })

hydrateRouter
    .route('/api/fact')
    .get((req, res) => {
        knexInstance
            .select('fact')
            .from('hydrate_facts')
            .first()
            .then(results => {
                res.json(results)
            })
    })


module.exports = hydrateRouter;