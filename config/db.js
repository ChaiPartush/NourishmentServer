const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'afkbrfxt',
    host: 'fanny.db.elephantsql.com',
    database: 'afkbrfxt',
    password: '0ZColNNtb0wY_nbRzQdUuFNkzbre-1eb',
    port: 5432
});

module.exports = pool;



