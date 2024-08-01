require('dotenv').config();

const Pool = require("pg").Pool;
//creating a pool that connects wwith the postgres dataBase
//fill out teh information according to what you have set in postGres SQL
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true, // Set to true if you have a valid SSL certificate
      },
});

module.exports = pool;