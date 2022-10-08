const svgToMiniDataURI = require('mini-svg-data-uri');
import Link from 'next/link';
import Image from 'next/image';

export default function EttKvitto({bild,data, setByt, hämtaQr}){
    return (
            <div style={{
                alignSelf: "center",
                textAlign: "center"
            }}>
                <Link href="/admin">
                    <button>tillbaka</button>
                </Link>
                <button onClick={() => setByt(true)}>ändra kvitto</button>
                <button onClick={()=> hämtaQr()}>hämta qrkod</button>
                <h3>vara: {data.vara} </h3>
                <h3>pris: {data.pris}kr</h3>
                <h3>kategori: {data.kategori} </h3>
                <h3>datum: {data.datum}</h3>
                <h3>swishnummer: {data.swish}</h3>
                <h3>fixad: {data.fixad.toString()}</h3>
                <Image src={`${(bild)}`}
                    alt="hämta qrkod för att visa qrkod  här"
                    width={1}
                    height={1}
                    layout="responsive"
                    objectFit="cover"/>
            </div>
    )
}