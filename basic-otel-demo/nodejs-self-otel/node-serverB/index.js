const { MyTracingSDK } = require('../shared/self-otel');
const sdk = new MyTracingSDK();
sdk.start();

const express = require('express');
const cors = require('cors');
const { SERVER_B_PORT } = require('../shared/config');
const { sleep } = require('../shared/utils');
const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello server B');
});

app.get('/api/trigger', async (req, res) => {
    console.log('---req.headers:', req.headers);

    await sleep(3000);
    res.json({ result: 'data from server b' });
});

app.listen(SERVER_B_PORT, () => {
    console.log(`server B listen to port ${SERVER_B_PORT}`);
});
