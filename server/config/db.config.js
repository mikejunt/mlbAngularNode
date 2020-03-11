const { Pool, Client } = require('pg')
const connectionString = process.env.DATABASE_URL

const client = new Client(connectionString);

const pool = new Pool(connectionString);

pool.on('error', (err,client) => console.log("Pool error:", err))

module.exports.client = client
module.exports.pool = pool