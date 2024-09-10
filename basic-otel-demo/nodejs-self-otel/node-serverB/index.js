const express = require('express');
const cors = require('cors');
const { SERVER_B_PORT } = require('../shared/config');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello server B');
});

app.get('/api/trigger', (req, res) => {
    res.send('data from server b');
});

app.listen(SERVER_B_PORT, () => {
    console.log(`server B listen to port ${SERVER_B_PORT}`);
});
