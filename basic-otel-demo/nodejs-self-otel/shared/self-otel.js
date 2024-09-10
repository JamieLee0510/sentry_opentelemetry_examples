const http = require('http');
const https = require('https');

// 生成隨機的 traceId 和 spanId
const crypto = require('crypto');
function generateId(bytes) {
    return crypto.randomBytes(bytes).toString('hex');
}

// SDK 類
class MyTracingSDK {
    constructor() {
        this.isStarted = false;
        this.originalHttpRequest = http.request;
        this.originalHttpsRequest = https.request;
    }

    // 啟動 SDK，攔截所有的 HTTP 請求
    start() {
        if (this.isStarted) {
            console.log('SDK 已經啟動');
            return;
        }

        this.isStarted = true;
        console.log('Tracing SDK 已啟動，攔截 HTTP 請求...');

        // 攔截 HTTP 請求
        http.request = (options, callback) => {
            this._tracingHandler(options); // 記錄請求
            return this.originalHttpRequest(options, callback);
        };

        // 攔截 HTTPS 請求
        https.request = (options, callback) => {
            this._tracingHandler(options); // 記錄請求
            return this.originalHttpsRequest(options, callback);
        };
    }

    _tracingHandler(options) {
        /**
         * TODO:
         * 1. check is root span or not
         * 2. if root, create trace id and current span id
         * 3. if not, create new span id and add into traceparent
         */
    }
}

module.exports = new MyTracingSDK();
