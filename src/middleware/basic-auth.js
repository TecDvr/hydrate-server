const knex = require('knex')
const { DATABASE_URL } = require('../config');
const bcrypt = require('bcryptjs');

const knexInstance = knex({
    client: 'pg',
    connection: DATABASE_URL,
});

function requireAuth(req, res, next) {
    const authToken = req.get('Authorization') || ''

    let basicToken
    if (!authToken.toLowerCase().startsWith('basic ')) {         // if no token throw error
        return res.status(401).json({ error: 'Missing token' })
    } else {
        basicToken = authToken.slice('basic '.length, authToken.length) 
    } // parse base64 basic token valueout of header

    const [tokenUserName, tokenPassword] = Buffer
        .from(basicToken, 'base64')
        .toString()
        .split(':')

    if (!tokenUserName || !tokenPassword) { // error for no UN or PW
        return res.status(401).json({ error: 'Unauthorized request' })
    }    

    knexInstance('hydrate_users') //query db for user & pw
        .where({ username: tokenUserName })
        .first()
        .then(user => {

            if (!user || !bcrypt.compareSync(tokenPassword, user.password)) {
                return res.status(401).json({ error: 'Unauthorized request' })
            }

            req.user = user
            next()

        })
        .catch(next)
}
  
module.exports = {
    requireAuth,
}