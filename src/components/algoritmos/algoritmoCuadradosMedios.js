import React, {useState, useEffect} from 'react'
import modifyNums from '../../services/algorithmFunctions'


const AlgoritmoCuadradosMedios = () =>{
    let [d, setD] = useState(3);
    let [seed, setSeed] = useState(100);
    let [amount, setAmount] = useState(0);
    let [generatedNums, setGeneratedNums] = useState([]);
    useEffect(()=>{
        let seedLength = seed.toString().length;
        if(d!==seedLength && seedLength>3&&seedLength<7){
            setD(seedLength);
        }
    }, [seed])
    const getNumsObj = (y,x,r) =>{
        return {
            y, 
            x,
            r
        };
    };
    const generateNums=()=>{
        let tempArr = [];
        let seedSquare = Math.pow(seed,2);
        let middleSeedValues = modifyNums.getMiddleValues(seedSquare, d);
        tempArr.push(getNumsObj(seedSquare, middleSeedValues, modifyNums.transformToR(middleSeedValues, d)));
        for(let i = 1; i< amount;i++){
            seedSquare = Math.pow(tempArr[i-1].x,2);
            middleSeedValues = modifyNums.getMiddleValues(seedSquare, d);
            tempArr.push(getNumsObj(seedSquare, middleSeedValues, modifyNums.transformToR(middleSeedValues,d)));
        }
        setGeneratedNums(tempArr);
    }

    return (
        <div>
            <div className='row d-flex justify-content-center'>
                <h1>
                    Algoritmo Cuadrados Medios
                </h1>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6 d-flex justify-content-between inputs' >
                        <label for='semilla'>Semilla:</label>
                        <input id='semilla' type='number' min='100' max='999999' value={seed} onChange={(e)=>setSeed(e.target.value)}/>
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

export default AlgoritmoCuadradosMedios