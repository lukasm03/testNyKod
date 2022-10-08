import Image from 'next/image'
import styles from '../styles/VisaKvitto.module.css'
import Link from 'next/link'

export default function ettKvittoiListan(id,vara,pris,kategori,datum, swish, bild, typavköp, fixad) {
    return (<div className={`${styles.parent}`} key={vara}>
        <div className={styles.div6}>
            <Link
                href={`/admin/${id}`}>
                <Image src={bild} alt={"bild på kvittot"} height={80} width={80} />
            </Link>
        </div>
        <div className={styles.div1}><p className={styles.fitText}>namn
            på {typavköp}: {vara} </p>
        </div>
        <div className={styles.div2}><p className={styles.fitText}>pris
            på {typavköp}: {pris}kr</p>
        </div>
        <div className={styles.div3}><p className={styles.fitText}>kategori
            på {typavköp}: {kategori}</p>
        </div>
        <div className={styles.div4}><p className={styles.fitText}>datum {typavköp}en
            skedde: {datum}</p>
        </div>
        <div className={styles.div5}><p className={styles.fitText}>swishnummer: {swish}</p>
        </div>
    </div>
    )
}