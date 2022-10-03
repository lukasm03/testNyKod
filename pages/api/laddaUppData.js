const { Pool } = require('pg');


export default async function handler(req,res) {
    const {vara,pris,datum,bild,swish,kategori,typavkop,fixad} = JSON.parse(req.body)
    const pool = new Pool({
        user: 'nfUsername',
        host: 'nfkvittodatabas.cnfjwjyptqjb.eu-north-1.rds.amazonaws.com',
        database: 'kvittoData',
        password: 'nfkingen',
        port: 5432
    });
  pool.query('INSERT INTO kvitton (vara,pris,datum,bild,swish,kategori,typavköp,fixad) VALUES ($1, $2,$3, $4,$5, $6,$7, $8) RETURNING *', [vara,pris,datum,bild,swish,kategori,typavkop,fixad], (error, results) => {
    if (error) {
      throw error
    }
    return res.status(200).end()
  })
}

