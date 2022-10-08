import { useState } from "react";
import styles from '../styles/SkickaKvitto.module.css'

export default function SkickaKvitto() {
    const [state, setState] = useState({
        vara: "",
        pris: "",
        datum: "",
        swish: "",
        bild: "",
        kategori: "Laborationer",
        typavkop: "avgift",
        fixad: false
    })
    const [bild, setBild] = useState(undefined)
    const [bildnamn, setBildNamn] = useState("")
    const [skickat, setSkickat] = useState("")

    const handleSubmit = async event => {
        event.preventDefault();
        await fetch('/api/laddaUppBild', {
            method: 'POST',
            body: JSON.stringify({
                bild: bild,
                namn: bildnamn
            }),
        }).then(res => res.json())
            .then(async bildUrl => await fetch('/api/laddaUppData', {
                method: 'POST',
                body: JSON.stringify({
                    vara: state.vara,
                    pris: state.pris,
                    datum: state.datum,
                    bild: bildUrl.bildUrl,
                    swish: state.swish,
                    kategori: state.kategori,
                    typavkop: state.typavkop,
                    fixad: state.fixad
                }),
            }));
        setBild("")
        setBildNamn("")
        setState({
            ...state,
            vara: "",
            pris: "",
            datum: "",
            bild: "",
            bildnamn: "",
            swish: "",
        })
        setSkickat("Kvitto inskickat!")
        await new Promise(r => setTimeout(r, 5000));
        setSkickat("")
    };

    const hanteraNytt = async event => {
        if (event.target.name === "bild") {
            let reader = new FileReader()
            reader.onloadend = function () {
                setBild(reader.result)
            }
            reader.readAsDataURL(event.target.files[0])
            setBildNamn(event.target.files[0].name)
            const value = event.target.value;
            setState({
                ...state,
                [event.target.name]: value
            });
        } else {
            setState({
                ...state,
                [event.target.name]: event.target.value
            });
        }
    }

    return (
        <div className={styles.Form}>
            <div className={styles.centerKnappar}>
                <button name="typavkop" value="avgift" onClick={hanteraNytt}>avgifter
                </button>
                <button name="typavkop" value="intäkt" onClick={hanteraNytt}>intäkt
                </button>
            </div>
            <form className={styles.formStyle} onSubmit={handleSubmit}>
                <label className={styles.labelStyle} htmlFor="kategori">kategori på {state.typavkop}:</label>
                <select className={styles.kategori} name="kategori" id="kategori" required onChange={hanteraNytt}>
                    <option value="Laborationer" name="Laborationer">Laborationer
                    </option>
                    <option value="Medlemsavgifter" name="Medlemsavgifter">Medlemsavgifter
                    </option>
                    <option value="Kök&fester">Kök & fester</option>
                    <option value="Försäljning">Försäljning</option>
                    <option value="NF-artiklar">NF-artiklar</option>
                    <option value="Övrigt">Övrigt</option>
                </select>
                <label className={styles.labelStyle} htmlFor="vara">vara:</label>
                <input type="text" name="vara" placeholder="namn på vara (max 16 tecken)" value={state.vara}
                    maxLength={16} required onChange={hanteraNytt}
                />
                <label className={styles.labelStyle} htmlFor="pris">pris:</label>
                <input type="number" name="pris" placeholder="pris (skriv inte kr)" value={state.pris} required onChange={hanteraNytt}
                />
                <label className={styles.labelStyle} htmlFor="datum">datum:</label>
                <input type="date" name="datum" value={state.datum} placeholder={Date.now()} required onChange={hanteraNytt}
                />
                <label className={styles.labelStyle} htmlFor="bild">kvitto:</label>
                <input type="file" accept="image/*" name="bild" value={state.bild}
                    style={{ alignSelf: "center" }}
                    placeholder="bild på kvitto"
                    required
                    onChange={hanteraNytt}
                />
                <label className={styles.labelStyle} htmlFor="vara">swish-nummer:</label>
                <input type="tel" name="swish" value={state.swish} placeholder={"swishnummer"} required
                    pattern="[0-9]{3}-[0-9]{7}|[0-9]{10}" onChange={hanteraNytt} />
                <button className={styles.buttonStyle} type="submit">
                    skicka in kvitto
                </button>
                <p style={{
                    display: "inline-block",
                    marginLeft: "0.5vw",
                    fontWeight: "bold",
                    fontSize: "0.7rem"
                }}>{skickat}</p>
            </form>
        </div>
    )
}
