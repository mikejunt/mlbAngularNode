const { Pool, Client } = require('pg')
const connectionString = process.env.DB_URL

const client = new Client(connectionString);

const pool = new Pool(connectionString);

pool.on('error', (err,client) => console.log("Pool error:", err))
pool.on('acquire',(client)=>  console.log("Client acquired from pool by query."))
pool.on('connect', (client) => console.log("New client connected to backend."))

module.exports.client = client
module.exports.pool = pool