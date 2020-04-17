import React, {useState, useEffect} from 'react'

const AlgoritmoCongruencialAditivo = () =>{
    let [d, setD] = useState(0);
    let [seeds, setSeeds] = useState([])
    let [n, setN] = useState(0);
    let [m, setM] = useState(0);
    let [currentSeed, setCurrentSeed] = useState(0);
    let [amount, setAmount] = useState(0);
    let [generatedNums, setGeneratedNums] = useState([]);

    const getNumsObj = (xi,xi_n,xi_1,divR,r) =>{
        return {
            xi,
            xi_n,
            xi_1,
            divR,
            r
        };
    };
    

    const removeValue = (index) =>{
        let temp = [...seeds];
        console.log(index)
        console.log(temp.slice(index))
        setSeeds(temp);
    }

    const addValueToArray = () =>{
        setSeeds([...seeds, currentSeed]);
        setCurrentSeed(0);
    }
    const generateNums=()=>{
            let tempArr = [];
            let tempY;
            let tempSeeds=[...seeds]
            // tempArr.push(getNumsObj(tempY, a, seed, `${seed}/${m-1}`, (tempY/(m-1)).toFixed(d)));
            for(let i = 0; i< amount; i++){
                console.log(`${tempSeeds[i]} ${tempSeeds[i+n-1]} ${n}`)
                tempY = (tempSeeds[i]+tempSeeds[i+n-1])%m;
                tempSeeds.push(tempY);
                tempArr.push(getNumsObj(tempY,tempSeeds[i],tempSeeds[i+n-1], `${tempY}/${m-1}`, (tempY/(m-1)).toFixed(d)));
                console.log(tempArr);
                console.log(tempSeeds)
            }
            setGeneratedNums(tempArr);
    }

    return (
        <div>
            <div className='row d-flex justify-content-center'>
                <h1>
                    Algoritmo Algoritmo Congruencial Aditivo
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
                        <label for='semilla'>Valor de n:</label>
                        <input id='semilla' type='number' value={n} onChange={(e)=>setN(parseInt(e.target.value))}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6 d-flex justify-content-between inputs' >
                        <label for='semilla'>Valor de m:</label>
                        <input id='semilla' type='number' value={m} onChange={(e)=>setM(parseInt(e.target.value))}/>
                    </div>
                </div>
                <div className='row number'>
                    <div className='col-6 d-flex'>
                        <label for='semilla mr-auto p-2'>Valores de X0 a Xn:</label>
                        <div className='ml-auto p-2'>
                            <input id='semilla' type='number' value={currentSeed} onChange={(e)=>setCurrentSeed(parseInt(e.target.value))}/>
                            <div className='btn btn-primary p-2' onClick={(e)=>addValueToArray()}>Agregar</div>
                        </div>
                    </div>
                    <div className='col-6 d-flex flex-wrap inputs' >
                        {seeds.map((seed, index)=>{
                            return(
                                <p className='number-list'>{seed}</p>
                            )
                        })}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6 d-flex justify-content-between inputs'>
                        <label for='generar'>Cantidad de Numeros a Generar:</label>
                        <input id='generar' type='number' value={amount} onChange={(e)=>setAmount(parseInt(e.target.value))}/>
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
                            <th scope="col">Xi</th>
                            <th scope="col">Xi-1</th>
                            <th scope="col">Xi-n</th>
                            <th scope="col">Process</th>
                            <th scope="col">ri</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            generatedNums.map((e)=>{
                                return (
                                    <tr scope="row">
                                        <td>{e.xi}</td>
                                        <td>{e.xi_1}</td>
                                        <td>{e.xi_n}</td>
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

export default AlgoritmoCongruencialAditivo