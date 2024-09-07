const { NodeSDK } = require('@opentelemetry/sdk-node');
const {
    OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-http');
const {
    getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
    ATTR_SERVICE_VERSION,
    ATTR_SERVICE_NAME,
} = require('@opentelemetry/semantic-conventions');
const { Resource } = require('@opentelemetry/resources');

const { jaegerUrl } = require('./config');

// 自定義服務的名稱
const resource = new Resource({
    [ATTR_SERVICE_NAME]: 'nodejs-service-01', // 自定義你的服務名稱
    [ATTR_SERVICE_VERSION]: '1.0.0', // 你可以選擇性設置版本號
});

const exporter = new OTLPTraceExporter({
    url: jaegerUrl,
});

const sdk = new NodeSDK({
    traceExporter: exporter,
    instrumentations: [getNodeAutoInstrumentations()],
    resource: resource, // 設置資源，包括自定義服務名稱
});

module.exports = {
    sdk,
};
