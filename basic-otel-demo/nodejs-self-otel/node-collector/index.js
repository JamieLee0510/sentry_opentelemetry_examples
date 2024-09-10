const express = require('express');
const cors = require('cors');
const { SELF_COLLECTOR_PORT_PORT } = require('../shared/config');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello self otel-collector');
});

app.post('/api/tracing', (req, res) => {
    // TODO: console the tracing data
});

app.listen(SELF_COLLECTOR_PORT_PORT, () => {
    console.log(
        `self otel-collector listen to port ${SELF_COLLECTOR_PORT_PORT}`,
    );
});
