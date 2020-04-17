import React, {useState, useEffect} from 'react'
import modifyNums from '../../services/algorithmFunctions'

const AlgoritmoMultiplicadorConstante = () =>{
    let [d, setD] = useState(3);
    let [seed, setSeed] = useState(100);
    let [a, setA] = useState(100);
    let [amount, setAmount] = useState(0);
    let [generatedNums, setGeneratedNums] = useState([]);
    let [unvalidA, setUnvalidA] = useState(false);
    useEffect(()=>{
        let seedLength = seed.toString().length;
        if(d!==seedLength && seedLength>3&&seedLength<7){
            setD(seedLength);
        }
    }, [seed, a])
    const getNumsObj = (y,a,x,r) =>{
        return {
            y, 
            a,
            x,
            r
        };
    };

    const generateNums=()=>{
        if(a.toString().length!=d){
            setUnvalidA(true);
        }else{
            setUnvalidA(false);
            let tempArr = [];
            let seedProduct = a * seed;
            let middleSeedValues = modifyNums.getMiddleValues(seedProduct, d);
            tempArr.push(getNumsObj(seedProduct, a, middleSeedValues, modifyNums.transformToR(middleSeedValues, d)));
            for(let i = 1; i< amount;i++){
                seedProduct = a * tempArr[i-1].x;
                middleSeedValues = modifyNums.getMiddleValues(seedProduct, d);
                tempArr.push(getNumsObj(seedProduct, a, middleSeedValues, modifyNums.transformToR(middleSeedValues, d)));
            }
            console.log(tempArr)
            setGeneratedNums(tempArr);
        }
    }

    return (
        <div>
            <div className='row d-flex justify-content-center'>
                <h1>
                    Algoritmo Multiplicador Constante
                </h1>
            </div>
            <div className='form-group'>
                {
                    unvalidA ? <div class="alert alert-danger" role="alert">
                        La constante debe tener el mismo valor que la semilla
                    </div> : ''
                }
                <div className='row'>
                    <div className='col-6 d-flex justify-content-between inputs' >
                        <label for='semilla'>Semilla X0:</label>
                        <input id='semilla' type='number' min='100' max='999999' value={seed} onChange={(e)=>setSeed(e.target.value)}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6 d-flex justify-content-between inputs' >
                        <label for='semilla'>Constante:</label>
                        <input id='semilla' type='number' min='100' max='999999' value={a} onChange={(e)=>setA(e.target.value)}/>
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
                            <th scope="col">Y</th>
                            <th scope="col">A</th>
                            <th scope="col">X</th>
                            <th scope="col">R</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            generatedNums.map((e)=>{
                                return (
                                    <tr scope="row">
                                        <td>{e.y}</td>
                                        <td>{e.a}</td>
                                        <td>{e.x}</td>
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

export default AlgoritmoMultiplicadorConstante