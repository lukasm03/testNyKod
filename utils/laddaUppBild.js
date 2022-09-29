//importera s3 från aws
import { PutObjectCommand, S3Client  } from "@aws-sdk/client-s3";

//initiera variabler och ladda in värden från bucket
const namnpåBucket = process.env.BUCKET_NAME
const region = process.env.BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

export default async function laddaUppBild(fil) {
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
    Body: fil.bild,
  }));
  //returnera länken till bilden 
  return (`https://${namnpåBucket}.s3.amazonaws.com/${namnpåBucket}/${fil.namn}`)
}

