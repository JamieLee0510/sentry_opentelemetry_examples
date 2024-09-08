const { config } = require('dotenv');

config();

module.exports = {
    SENTRY_ENDPOINT: process.env.SENTRY_ENDPOINT,
    PY_SERVER_URL: process.env.PY_SERVER_URL,
};
