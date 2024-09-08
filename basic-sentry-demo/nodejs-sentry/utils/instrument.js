const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');
const { SENTRY_ENDPOINT } = require('./config');
// Ensure to call this before requiring any other modules!

console.log('---SENTRY_ENDPOINT:', SENTRY_ENDPOINT);
Sentry.init({
    dsn: SENTRY_ENDPOINT,
    integrations: [
        // Add our Profiling integration
        nodeProfilingIntegration(),
    ],

    // Add Tracing by setting tracesSampleRate
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // Set sampling rate for profiling
    // This is relative to tracesSampleRate
    profilesSampleRate: 1.0,
});
