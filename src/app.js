require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const hydrateRouter = require('./hydrate/hydrate-router');
const twilio = require('twilio')
const accountSid = 'ACd183471dd28ac6cc49d602bf674dc6d8';
const authToken = '';
const client = require('twilio')(accountSid, authToken);
const cron = require('node-cron');

const app = express()

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(hydrateRouter);

app.get('/', (req, res) => {
    res.send('Welcome to Jurassic Park... Duh DAH duh na NUH');
});

cron.schedule('* * * * * *', () => {
    console.log('working')
})

app.get('/sms', (req, res, next) => {
    const { recipient, sms } = req.query

    client.messages
        .create({
        body: sms,
        from: '+16072694473',
        to: '+1' + recipient
   })
  .then(message => console.log(message.body))
  .catch(next)
})

app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
        console.error(error)
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response);
});

module.exports = app