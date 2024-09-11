const { MyTracingSDK } = require('../shared/self-otel');
const sdk = new MyTracingSDK();
sdk.start();

const { interceptRequest } = require('../shared/demo-http');
interceptRequest();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const {
    SERVER_A_PORT,
    SERVER_B_URL,
    SERVER_B_PORT,
} = require('../shared/config');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello server A');
});

app.get('/api/trigger', async (req, res) => {
    console.log('---req.headers:', req.headers);
    const resB = await axios.get(`${SERVER_B_URL}/api/trigger`);
    res.json({
        result: `data from server A, and serverB result: ${''}`,
    });

    // const reqB = http.request(
    //     {
    //         hostname: 'localhost',
    //         port: SERVER_B_PORT, // 假設 server B 使用的是 HTTP 協議
    //         path: '/api/trigger',
    //         method: 'GET',
    //         headers: {},
    //     },
    //     (response) => {
    //         let data = '';
    //         response.on('data', (chunk) => {
    //             data += chunk;
    //         });

    //         response.on('end', () => {
    //             res.json({ data: `server A, sub span: ${data}` });
    //         });
    //     },
    // );

    // reqB.on('error', (error) => {
    //     console.error(`Error making request to Server B: ${error.message}`);
    //     res.status(500).send('Error contacting Server B');
    // });

    // reqB.end(); // 發送請求
});

app.listen(SERVER_A_PORT, () => {
    console.log(`server A listen to port ${SERVER_A_PORT}`);
});
