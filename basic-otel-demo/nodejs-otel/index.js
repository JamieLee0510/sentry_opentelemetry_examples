const { sdk } = require('./instrumentation-jaeger');
const { trace } = require('@opentelemetry/api');
const axios = require('axios');

sdk.start();
// try {
//     sdk.start();

//     const demoTracing = () => {
//         const tracer = trace.getTracer('manual-tracer');
//         const span = tracer.startSpan('manual-span');
//         setTimeout(() => {
//             span.end(); // 結束 span
//             console.log('Span 已手動結束');

//             // Optional: 关闭 SDK 并确保数据被导出
//             sdk.shutdown().then(() => {
//                 console.log('SDK 已關閉');
//                 process.exit(0); // 退出應用程序
//             });
//         }, 3000);
//     };

//     demoTracing();
// } catch (err) {
//     console.error('sdk error:', err);
// }

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
    console.log(req.headers.traceParent);
    res.json({ message: 'receive opentelemetry' });
});

app.get('/api/test02', async (req, res) => {
    const pythonServiceRes = await axios.get(
        'http://localhost:3031/api/test-01',
    );
    console.log('---pythonServiceRes:', pythonServiceRes);
    res.json({ message: 'receive python service data successfully' });
});

app.listen(PORT, () => {
    console.log(`monitor server listen port: ${PORT}`);
});
