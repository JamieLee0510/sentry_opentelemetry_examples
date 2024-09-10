// const MyTracingSDK = require('../shared/self-otel');
// MyTracingSDK.start();

const { interceptRequest } = require('../shared/demo-http');
interceptRequest();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { SERVER_A_PORT, SERVER_B_URL } = require('../shared/config');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello server A');
});

app.get('/api/trigger', async (req, res) => {
    const serverB = await axios.get(`${SERVER_B_URL}/api/trigger`);
    res.json({ data: `server A, sub span: ${serverB.data}` });
});

app.listen(SERVER_A_PORT, () => {
    console.log(`server A listen to port ${SERVER_A_PORT}`);
});
