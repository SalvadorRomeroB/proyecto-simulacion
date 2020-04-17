import React, {useState} from 'react'

const AlgoritmoLineal = () =>{
    let [d, setD] = useState(0);
    let [seed, setSeed] = useState(0)
    let [a, setA] = useState(0);
    let [c, setC] = useState(0);
    let [m, setM] = useState(0);
    let [amount, setAmount] = useState(0);
    let [generatedNums, setGeneratedNums] = useState([]);

    const getNumsObj = (c,y,a,x,divR,r) =>{
        return {
            c,
            y, 
            a,
            x,
            divR,
            r
        };
    };

    const generateNums=()=>{
            let tempArr = [];
            let tempY = ((a*seed)+c)%m;
            tempArr.push(getNumsObj(c, tempY, a, seed, `${tempY}/${m-1}`, (tempY/(m-1)).toFixed(d)));
            for(let i = 1; i< amount;i++){
                tempY = (a*tempArr[i-1].y+c)%m;
                tempArr.push(getNumsObj(c, tempY, a, tempArr[i-1].y, `${tempY}/${m-1}`, (tempY/(m-1)).toFixed(d)));
            }
            console.log(tempArr);
            setGeneratedNums(tempArr);
    }

    return (
        <div>
            <div className='row d-flex justify-content-center'>
                <h1>
                    Algoritmo Lineal
                </h1>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6 d-flex justify-content-between inputs' >
                        <label for='semilla'>Cantidad de digitos:</label>
                        <input id='semilla' type='number' value={d} onChange={(e)=>setD(e.target.value)}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6 d-flex justify-content-between inputs' >
                        <label for='semilla'>Valor de a:</label>
                        <input id='semilla' type='number' value={a} onChange={(e)=>setA(e.target.value)}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6 d-flex justify-content-between inputs' >
                        <label for='semilla'>Valor de c:</label>
                        <input id='semilla' type='number' value={c} onChange={(e)=>setC(parseInt(e.target.value))}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6 d-flex justify-content-between inputs' >
                        <label for='semilla'>Valor de m:</label>
                        <input id='semilla' type='number' value={m} onChange={(e)=>setM(e.target.value)}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6 d-flex justify-content-between inputs' >
                        <label for='semilla'>Valor de X0:</label>
                        <input id='semilla' type='number' value={seed} onChange={(e)=>setSeed(e.target.value)}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6 d-flex justify-content-between inputs'>
                        <label for='generar'>Cantidad de Numeros a Generar:</label>
                        <input id='generar' type='number' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6 d-flex justify-content-end inputs'>
                        <div className='btn btn-primary' onClick={(e)=>generateNums()}>Generar</div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <p>D tiene un valor de: {d}</p>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col">Xi-1</th>
                            <th scope="col">Xi</th>
                            <th scope="col">m</th>
                            <th scope="col">c</th>
                            <th scope="col">Process</th>
                            <th scope="col">ri</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            generatedNums.map((e)=>{
                                return (
                                    <tr scope="row">
                                        <td>{e.x}</td>
                                        <td>{e.y}</td>
                                        <td>{e.m}</td>
                                        <td>{e.c}</td>
                                        <td>{e.divR}</td>
                                        <td>{e.r}</td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AlgoritmoLineal