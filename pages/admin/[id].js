import Head from "next/head";
import HeaderBild from "../../components/HeaderBild";
import adminStyles from '../../styles/adminStyles.module.css'
import UppdateraKvitto from "../../components/ÄndraKvitto";
const databasAnslutning = require('../../utils/anslutTillDatabas')

export default function Home({ data, bild }) {
    return (
        <>
            <Head>
                <title>{`Kvitto för ${data.vara}`}</title>
                <meta name="description" content="Hemsida för att se inlagda kvitton." />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={adminStyles.container}>
                <HeaderBild />
                <UppdateraKvitto bild={bild} data={data} />
            </div>
        </>
    )
}
export async function getStaticPaths() {
    const info = await databasAnslutning.query('SELECT * FROM kvitton ORDER BY id ASC')
    const paths = (info.rows).map((data) => ({
        params: {
            id: data.id.toString()
        }
    }))
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const kvittoInfo = await databasAnslutning.query('SELECT * FROM kvitton WHERE id = $1', [parseInt(params.id)])
    const rader = await kvittoInfo.rows[0]
    return {
        props: {
            data: {
                vara: rader.vara, pris: rader.pris, swish: rader.swish, id: rader.id,
                datum: rader.datum, kategori: rader.kategori, fixad: rader.fixad,
            }
        },
    };
}