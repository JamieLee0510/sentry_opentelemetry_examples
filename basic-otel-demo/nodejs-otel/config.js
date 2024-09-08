const { config } = require('dotenv');
config();

module.exports = {
    jaegerUrl: process.env.JAEGER_URL,
};
