const { sdk } = require('./instrumentation');
sdk.start();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'nodejs opentelemetry' });
});

app.get('/api/test01', (req, res) => {
    res.json({ message: 'receiver sentry data' });
});

app.listen(PORT, () => {
    console.log(`monitor server listen port: ${PORT}`);
});
