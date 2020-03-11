const { Pool, Client } = require('pg')
const connectionString = process.env.DATABASE_URL

const client = new Client({connectionString: connectionString,
                           ssl: true});

const pool = new Pool({connectionString: connectionString,
                       ssl: true});

pool.connect(err=>console.log(err, "from pool connect"))

client.connect(err=>console.log(err))

pool.on('error', (err,client) => console.log("Pool error:", err))

module.exports.client = client
module.exports.pool = pool