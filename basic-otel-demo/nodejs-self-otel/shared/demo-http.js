const http = require('http');
const https = require('https');

// 保留原始的 http/https 請求
const originalHttpRequest = http.request;
const originalHttpsRequest = https.request;

// 對 http/https 的 request 進行覆蓋（攔截）
function interceptRequest() {
    http.request = (options, callback) => {
        const origin = options.hostname || options.host;
        console.log(
            `[Hello Intercepted HTTP Request] Origin: ${origin}, Path: ${options.path}`,
        );
        // 調用原始的 http.request ，發出實際的請求
        return originalHttpRequest(options, callback);
    };
    https.request = (options, callback) => {
        const origin = options.hostname || options.host;
        console.log(
            `[Hello Intercepted HTTP Request] Origin: ${origin}, Path: ${options.path}`,
        );
        // 調用原始的 https.request ，發出實際的請求
        return originalHttpsRequest(options, callback);
    };
}

module.exports = {
    interceptRequest,
};
