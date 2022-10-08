import skapaExcelArk from "../utils/skapaExcelArk"
import styles from '../styles/VisaKvitto.module.css'

export default function KnapparOchExcelKnapp({data,setVisa}) {
    return (
        <>
            <span className={styles.FlexAndCenter}>
                <button className={styles.FlexAndCenter} onClick={() => skapaExcelArk(data)}>
                    exportera till excel
                </button>
            </span>
            <div className={styles.centerKnappar}>
                <button name="visaalla" value="alla" onClick={() => setVisa("alla")}>visa alla
                </button>
                <button name="visaintefixade" value="intefixade" onClick={() => setVisa("intefixade")}>visa inte
                    fixade
                </button>
                <button name="visaintäkter" value="visaintäkter" onClick={() => setVisa("intäkt")}>visa intäkter
                </button>
                <button name="visautgifter" value="visautgifter" onClick={() => setVisa("avgift")}>visa avgifter
                </button>
            </div>
        </>
    )
}