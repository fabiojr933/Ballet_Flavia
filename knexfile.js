const env = require('dotenv');

env.config();
const pg_database = process.env.DB_NAME;
const pg_host = process.env.DB_HOST;
const pg_user = process.env.DB_USER;
const pg_password = process.env.DB_PASS;
const pg_port = Number(process.env.DB_PORT);

module.exports = {
    dev: {
        client: 'pg',
        version: '14.2',
        connection: {
            host: pg_host,
            port: pg_port,
            user: pg_user,
            password: pg_password,
            database: pg_database,
        },
        migrations: {
            directory: './src/database/migrations',
        },
        seeds: {
            directory: './src/database/seeds'
        }
    },
};