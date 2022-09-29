import laddaUppBild from "../../utils/laddaUppBild";

export default async function handler(req,res) {
    try{
        let bildUrl = await laddaUppBild(JSON.parse(req.body))
        console.log(bildUrl)
        res.send("kvitto inskickat").status(200)
    }catch (felmeddelande){
        res.send(felmeddelande).status(400)
    }
}

