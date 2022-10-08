const databasAnslutning = require('../../utils/anslutTillDatabas')


export default async function handler(req, res) {
    const { vara, pris, datum, swish, kategori, fixad,id } = JSON.parse(req.body)
    databasAnslutning.query('UPDATE kvitton SET vara = $1,pris = $2,datum = $3,swish = $4,kategori = $5,fixad = $6 WHERE id = $7', [vara, parseInt(pris), datum, swish, kategori, fixad, parseInt(id)], (error) => {
        if (error) {
            throw error
        }
        return res.status(200).end()
    })
}

