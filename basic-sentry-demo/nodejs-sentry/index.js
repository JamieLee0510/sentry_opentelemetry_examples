// `Sentry.init()` should be before exporess import/require
require('./utils/instrument');

const express = require('express');
const cors = require('cors');
const Sentry = require('@sentry/node');
const axios = require('axios');

const { PY_SERVER_URL } = require('./utils/config');

const app = express();
const PORT = 3040;

app.use(cors());

app.get('/', function rootHandler(req, res) {
    res.end('Hello world!');
});

app.get('/api/test-node-sentry/get', (req, res) => {
    res.json({ message: 'receive sentry' });
});

app.get('/api/test-node-sentry/interact-py-server', async (req, res) => {
    const data = await axios.get(`${PY_SERVER_URL}/api/test-py-sentry/get`);
    console.log('res result:', interact - py - server);
    res.json({ message: `from py-server: ${data.message}` });
});
// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`NodeJS server with Sentry listen on port: ${PORT}`);
});
