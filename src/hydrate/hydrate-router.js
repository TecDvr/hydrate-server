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
        const { username, password, phone, glasses, daystart, dayend } = req.body;
        const newUser = { username, password, phone, glasses, daystart, dayend };
        knexInstance
            .insert(newUser)
            .into('hydrate_users')
            .then(user => {
                res.status(201).json(user);
            })
            .catch(next)
    })

hydrateRouter
    .route('/api/user/login')
    .post((req,res) => {
        
    })

module.exports = hydrateRouter; 