import Main from "../components/main";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <html lang="SE"/>
                <meta name="description" content="En hemsida för att hantera den Naturvetenskapliga föreningens kvitton och köp."/>
                <title>NF Kvitton</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
            </Head>
            <section>
                <Main/>
            </section>
        </>
    )
}
