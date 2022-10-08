const { Pool } = require('pg');

const pool = new Pool({
    user: 'nfUsername',
    host: 'nfkvittodatabas.cnfjwjyptqjb.eu-north-1.rds.amazonaws.com',
    database: 'kvittoData',
    password: 'nfkingen',
    port: 5432
});

module.exports = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback)
    },
  }