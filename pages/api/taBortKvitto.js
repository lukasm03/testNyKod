const databasAnslutning = require('../../utils/anslutTillDatabas')

export default async function handler(req, res) {
    const id = JSON.parse(req.body).id
    databasAnslutning.query('DELETE FROM kvitton WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).end()
    })
}