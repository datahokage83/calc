import React, { useState } from 'react'
import './Calculator.css'

export default function Calculator() {

    const [calc, setCalc] = useState("")
    const [result, setResult] = useState("")
    const [counted, setCounted] = useState("")

    const ops = ['/','*','+','-','.']

    const updateCalc = value => {
        if ( 
            (ops.includes(value) && calc === '') || 
            (ops.includes(value) && ops.includes(calc.slice(-1)))
            ) return

        setCalc(calc + value)

        if (!ops.includes(value)) {
            setResult(eval(calc + value).toString())
        }
    }

    const createDigits = () => {
        const digits = []

        for (let i = 1; i < 10; i++) {
            digits.push(
                <button onClick={() => updateCalc(i.toString())}  key={i}>{i}</button>
            )
        }

        return digits
    }

    const calculate = () => {
        setCalc(eval(calc).toString())
        setCounted(terbilang(eval(calc)))

    }

    const deleteLast = () => {
        if (calc === '') return

        const value = calc.slice(0, -1)

        setCalc(value)
    }
    
    function terbilang(nilai) {
        let bilangan= nilai.toString();
        let kalimat = "";
        let angka   = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];
        let kata    = ['','Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Delapan','Sembilan'];
        let tingkat = ['','Ribu','Juta','Milyar','Triliun'];
        let panjang_bilangan = bilangan.length;
        
        if(panjang_bilangan > 15){
            kalimat = "Diluar Batas";
        }else{  

            for(let i = 1; i <= panjang_bilangan; i++) {
                angka[i] = bilangan.substr(-(i),1);
            }
            
            let i = 1;
            let j = 0;
            
            while(i <= panjang_bilangan){
                let subkalimat = "";
                let kata1 = "";
                let kata2 = "";
                let kata3 = "";
                
                if(angka[i+2] !== "0"){
                    if(angka[i+2] === "1"){
                        kata1 = "Seratus";
                    }else{
                        kata1 = kata[angka[i+2]] + " Ratus";
                    }
                }
                
                if(angka[i+1] !== "0"){
                    if(angka[i+1] === "1"){
                        if(angka[i] === "0"){
                            kata2 = "Sepuluh";
                        }else if(angka[i] === "1"){
                            kata2 = "Sebelas";
                        }else{
                            kata2 = kata[angka[i]] + " Belas";
                        }
                    }else{
                        kata2 = kata[angka[i+1]] + " Puluh";
                    }
                }
                
                if (angka[i] !== "0"){
                    if (angka[i+1] !== "1"){
                        kata3 = kata[angka[i]];
                    }
                }
                
                if ((angka[i] !== "0") || (angka[i+1] !== "0") || (angka[i+2] !== "0")){
                    subkalimat = kata1+" "+kata2+" "+kata3+" "+tingkat[j]+" ";
                }
                
                kalimat = subkalimat + kalimat;
                i = i + 3;
                j = j + 1;
            }
            
            if ((angka[5] === "0") && (angka[6] === "0")){
                kalimat = kalimat.replace("Satu Ribu","Seribu");
            }
        }
        return kalimat + 'Rupiah'
    }

    return (
        <div className="app">
            <div className="calculator">
                <div className="display">
                    { result ? <span>{result}</span> : ''} { calc || '0'}
                </div>
                <div className="display-text">
                    { result ? counted : ''}
                     {/* Seratus Ribu Rupiah  */}
                </div>
                
                <div className="operators">
                    <button onClick={() => updateCalc('/')} >/</button>
                    <button onClick={() => updateCalc('*')} >*</button>
                    <button onClick={() => updateCalc('+')} >+</button>
                    <button onClick={() => updateCalc('-')} >-</button>
                    
                    <button onClick={deleteLast}>DEL</button>
                </div>
                
                <div className="digits">
                    { createDigits() }
                    <button onClick={() => updateCalc('0')} >0</button>
                    <button onClick={() => updateCalc('.')} >.</button>

                    <button onClick={calculate}>=</button>
                </div>
            </div>
        </div>
    )
}
