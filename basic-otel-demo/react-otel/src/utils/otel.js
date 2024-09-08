import { Resource } from '@opentelemetry/resources';
import {
    ATTR_SERVICE_VERSION,
    ATTR_SERVICE_NAME,
} from '@opentelemetry/semantic-conventions';
import {
    WebTracerProvider,
    SimpleSpanProcessor,
    ConsoleSpanExporter,
} from '@opentelemetry/sdk-trace-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

// 註冊、啟用中間件，如 fetch、XMLHttpRequest，確保發起請求的時候，自動trace和span
import { registerInstrumentations } from '@opentelemetry/instrumentation'; // TODO: 這個作用是？
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch'; // TODO: 這個作用是？

import { PROXY_JAEGER_API, NODE_SERVER_API } from './config';

const consoleExporter = new ConsoleSpanExporter();
const collectorExporter = new OTLPTraceExporter({
    url: PROXY_JAEGER_API, // 现在指向 Vite 开发服务器的代理
});

const provider = new WebTracerProvider({
    resource: new Resource({
        [ATTR_SERVICE_NAME]: 'react-client-01', // 自定義你的服務名稱
        [ATTR_SERVICE_VERSION]: '1.0.0', // 你可以選擇性設置版本號
    }),
});

const nodeApiReg = new RegExp(
    `^${NODE_SERVER_API.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/?`,
);

// 註冊服務的url正則，因為browser cors的緣故
const fetchInstrumentation = new FetchInstrumentation({
    propagateTraceHeaderCorsUrls: [nodeApiReg],
});
fetchInstrumentation.setTracerProvider(provider);

provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter));

provider.addSpanProcessor(new SimpleSpanProcessor(collectorExporter));

provider.register();

export const startOtelInstrumentation = () => {
    registerInstrumentations({
        instrumentations: [fetchInstrumentation],
        tracerProvider: provider,
    });
};
