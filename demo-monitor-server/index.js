const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'monitor-server' });
});

app.post('/sentry', (req, res) => {
    const data = req.body;
    console.log('monitor server get Sentry mock data: ', data);
    res.json({ message: 'receiver sentry data' });
});

app.post('/otel-trace', (req, res) => {
    const data = req.body;
    console.log(
        'monitor server get Opentelemetry data: ',
        JSON.stringify(data),
    );
    res.json({ message: 'receive Opentelemetry data' });
});

app.listen(PORT, () => {
    console.log(`monitor server listen port: ${PORT}`);
});
