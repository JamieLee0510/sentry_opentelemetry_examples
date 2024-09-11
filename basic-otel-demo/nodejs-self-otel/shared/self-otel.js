const http = require('http');
const https = require('https');
const hook = require('require-in-the-middle');

// 生成隨機的 traceId 和 spanId
const crypto = require('crypto');
function generateId(bytes) {
    return crypto.randomBytes(bytes).toString('hex');
}

class MockExporter {
    export(spans) {
        spans.forEach((span) => {
            console.log(span);
            // TODO: send span to mock collector
        });
    }
}

class SimpleSpanProcessor {
    constructor(exporter) {
        this.exporter = exporter;
    }

    onEnd(span) {
        this.exporter.export([span]); // 傳送 span 到 Exporter
    }
}

class Span {
    constructor(traceId, spanId, parsentSpanId, name, processor) {
        this.traceId = traceId;
        this.spanId = spanId;
        this.parsentSpanId = parsentSpanId;
        this.name = name;
        this.processor = processor;

        // recording start date time
        this.startTime = Date.now();
    }

    end() {
        // recording end date time
        this.endTime = Date.now();
        const duration = this.endTime - this.startTime;
        console.log(
            `Span ${this.spanId} (${this.name}) ended. Duration: ${duration}ms`,
        );

        // send this span to SpanProcessor
        this.processor.onEnd(this);
    }
}

class Tracer {
    constructor(name, processor) {
        this.name = name;
        this.processor = processor;
    }

    startSpan(name, options) {
        // get trace id or create new trace id due to root
        const traceId =
            options && options.traceId ? options.traceId : generateId(16);
        const parentSpanId =
            options && options.parentSpanId ? options.parentSpanId : undefined;
        const spanId = generateId(8);

        console.log(
            `Starting span with traceId: ${traceId} and spanId: ${spanId}`,
        );

        return new Span(traceId, spanId, parentSpanId, name, this.processor);
    }
}

// SDK 類
class MyTracingSDK {
    constructor() {
        this.isStarted = false;
        this.originalHttpRequest = http.request;
        this.originalHttpsRequest = https.request;

        // mock exporter and related
        this.exporter = new MockExporter();
        this.processor = new SimpleSpanProcessor(this.exporter);
        this.tracer = new Tracer('mock-tracer', this.processor);
        this.traceContext = null;
    }

    // 啟動 SDK，攔截所有的 HTTP 請求
    start() {
        if (this.isStarted) {
            console.log('SDK 已經啟動');
            return;
        }

        this.isStarted = true;

        // 攔截 exporess
        hook(['express'], (exports) => {
            const original = exports;
            return (...args) => {
                const app = original(...args);

                // auto imply middleware
                app.use((req, res, next) => {
                    console.log('intercept - express middleware');

                    // 理論上，在中間件要修改
                    const currSpan = this._tracingHandler(req); // 記錄請求

                    // 當請求結束時，結束 span
                    res.on('finish', () => {
                        currSpan.end();
                        this.traceContext = null;
                    });
                    next();
                });
                return app;
            };
        });

        this._interceptHttp();
    }

    _interceptHttp() {
        console.log('Tracing SDK 已啟動，攔截 HTTP 請求...');

        // 攔截發起的 HTTP 請求，附上 traceparent header
        http.request = (options, callback) => {
            console.log('---intercept http');
            const newOptions = {
                ...options,
                headers: options.headers
                    ? {
                          ...options.headers,
                          ...this.traceContext,
                      }
                    : { ...this.traceContext },
            };
            return this.originalHttpRequest(newOptions, callback);
        };

        // 攔截 HTTPS 請求
        https.request = (options, callback) => {
            console.log('---intercept https');
            const currSpan = this._tracingHandler(options); // 記錄請求
            const req = this.originalHttpsRequest(options, (response) => {
                // 當請求完成時，結束 span
                currSpan.end();
                if (callback) callback(response);
            });

            req.on('error', (error) => {
                console.error(`Request error: ${error.message}`);
                span.end(); // 當請求失敗時也結束 span
            });

            return req;
        };
    }

    _tracingHandler(req) {
        let traceId;
        let version;
        let traceFlag;
        let parentSpan;
        console.log('---options.headers:', req.headers);
        if (!req.headers['traceparent']) {
            req.headers['traceparent'] = {};
            traceId = generateId(16);
            version = '00';
            traceFlag = '01';
            parentSpan = '';
        } else {
            const traceContextArr = req.headers['traceparent'].split('-');
            traceId = traceContextArr[1];
            version = traceContextArr[0];
            traceFlag = traceContextArr[3];
            parentSpan = traceContextArr[2];
        }

        // generate span for current service
        const spanId = generateId(8);

        this.traceContext = {
            traceparent: `${version}-${traceId}-${spanId}-${traceFlag}`,
        };
        const newSpan = this.tracer.startSpan('mock-span', {
            traceId,
            parentSpanId: parentSpan,
        });

        return newSpan;
    }
}

module.exports = {
    MyTracingSDK,
};
