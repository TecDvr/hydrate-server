const bcrypt = require('bcryptjs')
const knex = require('knex')
const { DB_URL } = require('../config');

const knexInstance = knex({
    client: 'pg',
    connection: DB_URL,
});

function requireAuth(req, res, next) {
    console.log('requiredAuth');
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
            if (!user) { 
                return res.status(401).json({ error: 'Unauthorized request' })
            }

            return bcrypt.compare(tokenPassword, user.password)
                .then(passwordsMatch => {
                    if (!passwordsMatch) {
                        console.log('testinggg')
                        return res.status(401).json({ error: 'Unauthorized request' })
                    }

                    req.user = user // add user object from db to request object
                    next()
                })
        })
        .catch(next)
}
  
module.exports = {
    requireAuth,
}