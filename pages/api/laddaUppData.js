const databasAnslutning = require('../../utils/anslutTillDatabas')

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '4mb' // Set desired value here
      }
  }
}

export default async function handler(req,res) {
    const {vara,pris,datum,bild,swish,kategori,typavkop,fixad} = JSON.parse(req.body)
    databasAnslutning.query('INSERT INTO kvitton (vara,pris,datum,bild,swish,kategori,typavköp,fixad) VALUES ($1, $2,$3, $4,$5, $6,$7, $8) RETURNING *', [vara,pris,datum,bild,swish,kategori,typavkop,fixad], (error, results) => {
    if (error) {
      throw error
    }
    return res.status(200).end()
  })
}

