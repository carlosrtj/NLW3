const { Pool } = require("pg")

module.exports = new Pool({
    user: 'postgres',
    password: '7263485',
    host: 'localhost',
    port: 5432,
    database: 'NLW3'
})