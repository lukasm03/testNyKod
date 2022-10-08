import Link from "next/link";
import EttKvitto from "./EttKvitto";
import {useState} from "react";


export default function UppdateraKvitto({data}) {
    const [state, setState] = useState({...data})
    const [byt, setByt] = useState(false)
    const [bild, sättBild] = useState("")

    const hanteraNytt = async event => {
        setState({
            ...state,
            [event.target.id]: event.target.value
        });
    }

    const hanteraSubmit = async event => {
        event.preventDefault();
        await fetch('/api/UppdateraKvitto', {
            method: 'POST',
            body: JSON.stringify({
                vara: state.vara, pris: state.pris, datum: state.datum, swish:state.swish, 
                kategori:state.kategori, fixad:state.fixad, id: state.id
            }),
        })
    }

    async function taBortKvitto(id){
        await fetch('/api/taBortKvitto', {
            method: 'POST',
            body: JSON.stringify({
                id: id
            }),
        })
    }
    async function hämtaQrKod(){
        const options = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: `{"payee":${JSON.stringify(state.swish)},"amount":{"value":${((state.pris))}},"message":{"value":${JSON.stringify(state.vara)}}}`
        };
        
        fetch('https://api.swish.nu/qr/v2/prefilled', options)
          .then((response) => response.blob())
          .then((blob) => URL.createObjectURL(blob))
          .then((url) => sättBild(url))
          .catch(err => console.error(err));
      }


    return byt === false
        ? (
            <>
                    <EttKvitto bild={bild} data={data} setByt={setByt} hämtaQr={hämtaQrKod}></EttKvitto>
            </>
        ) : (
            <>
                    <div style={{
                        alignSelf: "center",
                        textAlign: "center"
                    }}>
                        <Link href="/admin">
                            <button>tillbaka test</button>
                        </Link>
                        <button onClick={() => setByt(false)}>sluta ändra kvitto</button>
                        <button onClick={() => taBortKvitto(state.id)}>ta bort kvitto</button>
                        <form onSubmit={hanteraSubmit} onChange={hanteraNytt}>
                            <h3>vara: <input type="text" id="vara" defaultValue={state.vara}/></h3>
                            <h3>pris: <input type="number" id="pris" defaultValue={state.pris}/>kr </h3>
                            <h3>kategori: <select name="kategori" id="kategori" defaultValue={state.kategori}>
                                <option value="Laborationer" name="Laborationer">Laborationer</option>
                                <option value="Medlemsavgifter" name="Medlemsavgifter">Medlemsavgifter</option>
                                <option value="Kök&fester">Kök & fester</option>
                                <option value="Försäljning">Försäljning</option>
                                <option value="NF-artiklar">NF-artiklar</option>
                                <option value="Övrigt">Övrigt</option>
                            </select></h3>
                            <h3>datum: <input type="date" id="datum" defaultValue={state.datum}/></h3>
                            <h3>fixad: <input onChange={(e) => e.target.value = e.target.checked} type="checkbox" id="fixad" checked={JSON.parse(state.fixad)}/></h3>
                            <h3>swishnummer: <input type="tel" id="swish" defaultValue={state.swish}/></h3>
                            <button type="submit">genomför ändring</button>
                        </form>
                    </div>
            </>
        )

}



