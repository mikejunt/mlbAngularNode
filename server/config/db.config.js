const { Pool, Client } = require('pg')
const connectionString = process.env.DB_URL

const client = new Client(connectionString);

const pool = new Pool(connectionString);

module.exports.client = client
module.exports.pool = pool