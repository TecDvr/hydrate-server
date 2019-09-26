const express = require('express');
const knex = require('knex');
const { DB_URL } = require('../config');

const jsonParser = express.json()
const hydrateRouter = express.Router();
const knexInstance = knex({
    client: 'pg',
    connection: DB_URL,
});

hydrateRouter
    .route('/api/user')
    .get((req, res) => {
        knexInstance
            .select('*')
            .from('hydrate_users')
            .then(results => {
                res.json(results)
            })
    })
    .post(jsonParser, (req, res, next) => {
        const { username, password, glasses } = req.body;
        const newUser = { username, password, glasses };
        knexInstance
            .insert(newUser)
            .into('hydrate_users')
            .then(user => {
                res.status(201).json(user);
            })
            .catch(next)
    })
    

hydrateRouter
    .route('/api/user/:id')
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

module.exports = hydrateRouter;