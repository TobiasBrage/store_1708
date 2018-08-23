const passwordHash = require('password-hash');

module.exports = {
    'getAll': () => {
        db.query(`SELECT * FROM products`, function (err, result) {
            return JSON.stringify(result);
        })
    }
};