//anslut till databas
//ladda upp info
//ändra info
//ta bort info

const { Client } = require('pg')

const client = new Client({
    user: 'nfusername',
    host: 'nfkvittodatabas.cnfjwjyptqjb.eu-north-1.rds.amazonaws.com',
    database: 'postgres',
    password: 'nfpassword',
    port: 5432,
  })
  client.connect()
  client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
  })
  