import laddaUppBild from "../../utils/laddaUppBild";

export default async function handler(req, res) {
    let bildUrl = await laddaUppBild(JSON.parse(req.body))
    console.log(bildUrl)
    res.send("kvitto inskickat")
}

