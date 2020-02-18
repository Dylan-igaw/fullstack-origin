const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    host: '192.168.0.128',
    database: 'analytics',
    password: 'dmp1',
    port: 5432,
});

module.exports = {
    client: client,
};