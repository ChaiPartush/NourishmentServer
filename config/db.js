const Pool = require("pg").Pool;

const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'chai1996',
    database: 'NourishmentDB',
    port: 5432
});

module.exports = pool;



