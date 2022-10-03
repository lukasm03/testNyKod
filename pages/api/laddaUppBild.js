//importera s3 från aws
import { PutObjectCommand, S3Client  } from "@aws-sdk/client-s3";

//initiera variabler och ladda in värden från bucket
const namnpåBucket = process.env.BUCKET_NAME
const region = process.env.BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID_LUKAS
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_LUKAS

export default async function handler(req,res) {
  const fil = JSON.parse(req.body)
  const base64Data = new Buffer.from(fil.bild.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  const type = fil.bild.split(';')[0].split('/')[1];
  //anslut till lagringen
  const databasAnslutning = new S3Client({
    region, credentials: {
      accessKeyId,
      secretAccessKey
    }
  });
  //ladda upp filen till lagringen
  await databasAnslutning.send(new PutObjectCommand({
    Bucket: namnpåBucket,
    Key: fil.namn,
    Body: base64Data,
    ContentEncoding: 'base64',
    ContentType: `image/${type}`
  }));
  //returnera länken till bilden 
  return res.send({bildUrl:`https://${namnpåBucket}.s3.eu-north-1.amazonaws.com/${fil.namn}`})
}

