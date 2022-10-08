import VisaKvitton from "../../components/VisaKvitton";
import Head from "next/head";
import HeaderBild from "../../components/HeaderBild";
import adminStyles from '../../styles/adminStyles.module.css'
const databasAnslutning = require('../../utils/anslutTillDatabas')


export default function Home({ data }) {
    return (
        <>
            <Head>
                <title>NF Kvitton admin</title>
                <meta name="description"
                    content="Hemsida för att se inlagda kvitton." />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={adminStyles.container}>
                <HeaderBild />
                <VisaKvitton data={data} />
            </div>
        </>
    )
}
export async function getStaticProps() {
    const data = await databasAnslutning.query('SELECT * FROM kvitton ORDER BY id ASC')
    return {
        props: {
            data: JSON.parse(JSON.stringify(data.rows)),
        }
    }
}