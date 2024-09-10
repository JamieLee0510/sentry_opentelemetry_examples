const crypto = require('crypto');
function generateId(bytes) {
    return crypto.randomBytes(bytes).toString('hex');
}

module.exports = {
    generateId,
};
