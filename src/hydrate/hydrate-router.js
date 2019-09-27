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
    .patch(jsonParser, (req, res, next) => {
        const { glasses } = req.body
        const glassesUpdate = { glasses }
        const {id} = req.params

        const numberOfValues = Object.values(glassesUpdate).filter(Boolean).length
        if (numberOfValues === 0)
        return res.status(400).json({
        error: {
        message: `Request body must contain either 'glasses'`
        }
      })

        knexInstance('hydrate_users')
            .where( {id} )
            .update({glasses})
            .then(user => {
                res.status(204).end();
            })
            .catch(next)
    })

module.exports = hydrateRouter;