const crypto = require('crypto');
function generateId(bytes) {
    return crypto.randomBytes(bytes).toString('hex');
}

function sleep(ms) {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

module.exports = {
    generateId,
    sleep,
};
