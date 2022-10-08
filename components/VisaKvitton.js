import styles from '../styles/VisaKvitto.module.css'
import { useState } from "react";
import KnapparOchExcelKnapp from './KnapparTillKvittoSidan';
import ettKvittoiListan from './EttKvittoiListan';

export default function VisaKvitton({ data }) {
    const [visa, setVisa] = useState("alla")

    function comp(a, b) {
        return new Date(a.datum).getTime() - new Date(b.datum).getTime();
    }

    data.sort(comp)

    if (visa === "intefixade") {
        return (
            <>
                <KnapparOchExcelKnapp data={data} setVisa={setVisa}></KnapparOchExcelKnapp>
                <div className={styles.Padding1REM}>
                    <h3 style={{ marginBottom: "0" }}>senaste kvitton:</h3>
                    {data.slice(0).reverse().map(({ id, vara, pris, kategori, datum, swish, bild, typavköp, fixad }) => {
                        if (fixad === false) {
                            return ettKvittoiListan(id, vara, pris, kategori, datum, swish, bild, typavköp, fixad)
                        }
                    })}
                </div>
            </>
        )
    } else if (visa === "intäkt") {
        return (
            <>
                <KnapparOchExcelKnapp data={data} setVisa={setVisa}></KnapparOchExcelKnapp>
                <div className={styles.Padding1REM}>
                    <h3 style={{ marginBottom: "0" }}>senaste kvitton:</h3>
                    {data.slice(0).reverse().map(({ id, vara, pris, kategori, datum, swish, bild, typavköp, fixad }) => {
                        if (typavköp === "intäkt") {
                            return (
                                ettKvittoiListan(id, vara, pris, kategori, datum, swish, bild, typavköp, fixad)
                            )
                        }
                    })}
                </div>
            </>
        )
    } else if (visa === "avgift") {
        return (
            <>
                <KnapparOchExcelKnapp data={data} setVisa={setVisa}></KnapparOchExcelKnapp>
                <div className={styles.Padding1REM}>
                    <h3 style={{ marginBottom: "0" }}>senaste kvitton:</h3>
                    {data.slice(0).reverse().map(({ id, vara, pris, kategori, datum, swish, bild, typavköp, fixad }) => {
                        if (typavköp === "avgift") {
                            return (
                                ettKvittoiListan(id, vara, pris, kategori, datum, swish, bild, typavköp, fixad)
                            )
                        }
                    })}
                </div>
            </>
        )
    } else {
        return (
            <>
                <KnapparOchExcelKnapp data={data} setVisa={setVisa}></KnapparOchExcelKnapp>
                <div className={styles.Padding1REM}>
                    <h3 style={{ marginBottom: "0" }}>senaste kvitton:</h3>
                    {data.slice(0).reverse().map(({ id, vara, pris, kategori, datum, swish, bild, typavköp, fixad }) => {
                        return (
                            ettKvittoiListan(id, vara, pris, kategori, datum, swish, bild, typavköp, fixad)
                        )
                    })
                    }
                </div>
            </>
        )
    }
}

