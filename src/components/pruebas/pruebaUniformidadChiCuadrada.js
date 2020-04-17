import React, {useEffect,useState} from 'react'
import jStat from 'jstat'
import {standardNormalTable} from 'simple-statistics'
import chi from 'chi-squared'
import chiSquareInverse from 'inv-chisquare-cdf'

const PruebaUnidormidadChiCuadrada = () =>{
    let [c, setC] = useState('');
    let [n, setN] = useState(0);
    let [m, setM] = useState(0);
    let [currentNum, setCurrentNum] = useState('');
    let [numbersCSVString, setNumbersCSVString] = useState('');
    let [numbers, setNumbers] = useState([]);
    let [acepta, setAcepta] = useState(false);
    let [testRun, setTestRun] = useState(false);
    let [chiSum, setChiSum] = useState(0);
    let [alpha, setAlpha] = useState(0.05);
    let [chiValue, setChiValue] = useState(0);
    let [testTable, setTestTable] = useState([]);

    const getObject = (interval, oi, ei, eioiei) => {
        return {
            interval,
            oi,
            ei,
            eioiei
        }
    }

    useEffect(()=>{
        if(chiValue>chiSum){
            setAcepta(true)
        }
        if(testTable.length>0)
            setTestRun(true);
    }, [chiSum])

    useEffect(()=>{
        let degreeFreed = m > 2 ? m -1 : 1;
        setChiValue(chiSquareInverse.invChiSquareCDF(1-alpha/2,degreeFreed));
    },[alpha, m])

    const addCSVValues = () => {
        if(parseFloat(c)){
            let nums = numbersCSVString.split(',').map((e)=>parseFloat(e));
            setAlpha(parseFloat(c));
            setNumbers([...nums]);
            setN(nums.length);
            setM(Math.pow(nums.length,.5));
        }
    }
    const addValueToArray = () =>{
        setNumbers([...numbers, currentNum]);
        setCurrentNum('');
    }

    const calculateUni = () =>{
        if(numbers.length>0){
            let ei = n/m;
            let temp = [...testTable]
            let tempEi = [];
            for(let i = 0; i < m; i++){
                let oi = numbers.filter((e)=>(e>(.1*i)&&e<(.1*(i+1)))).length
                let eioisquaredei = Math.pow(ei-oi,2)/ei
                temp.push(getObject(`[${.01*i}-${.01*(i+1)}]`, oi, ei, eioisquaredei));
                tempEi.push(eioisquaredei);
            }
            setTestTable(temp)
            setChiSum(tempEi.reduce((prev, curr)=>prev+curr));
        }
    }

    return (
        <div>
            <div className='row d-flex justify-content-center'>
                <h1>
                    Prueba de Uniformidad Chi-Cuadrada
                </h1>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6 d-flex justify-content-between inputs' >
                        <label for='semilla'>Nivel de Confianza:</label>
                        <input id='semilla' type='text' value={c} onChange={(e)=>setC(e.target.value)}/>
                    </div>
                </div>
                <div className='row '>
                    <div className='col-6 d-flex flex-column'>
                        <div className='d-flex flex-column'>
                            <label for='numero'>Ingresar digitos de uno en uno:</label>
                            <div className='d-flex'>
                                <input id='numero' type='text' value={currentNum} onChange={(e)=>setCurrentNum(e.target.value)}/>
                                <div className='btn btn-primary ml-auto p-2' onClick={(e)=>addValueToArray()}>Agregar</div>
                            </div>
                        </div>
                        <div className='d-flex flex-column'>
                            <label for='csv'>Ingresar digitos separados por comas (Estilo de un csv):</label>
                            <div className='d-flex'>
                                <input id='csv' type='text' value={numbersCSVString} onChange={(e)=>setNumbersCSVString(e.target.value)}/>
                                <div className='btn btn-primary ml-auto p-2' onClick={(e)=>addCSVValues()}>Agregar</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-6 d-flex flex-wrap inputs' >
                        {numbers.map((num)=>{
                            return <p className='number-list'>{num}</p>
                        })}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6 d-flex justify-content-end inputs'>
                        <div className='btn btn-primary' onClick={(e)=>calculateUni()}>Hacer Prueba</div>
                    </div>
                </div>
            </div>
            <div className='row'>
                {
                    testRun ? 
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        Intervalo
                                    </th>
                                    <th>
                                        Oi
                                    </th>
                                    <th>
                                        Ei = n/m
                                    </th>
                                    <th>
                                        (Ei-Oi)^2/Ei
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    testTable.map((e)=>{{
                                        return(
                                            <tr>
                                                <td>{e.interval}</td>
                                                <td>{e.oi}</td>
                                                <td>{e.ei}</td>
                                                <td>{e.eioiei}</td>
                                            </tr>
                                        )
                                    }})
                                }
                            </tbody>
                        </table>
                        {acepta ?
                        <div className="card text-white bg-secondary mb-3" >
                            <div className="card-header">No se puede negar la hipotesis</div>
                            <div className="card-body">
                                <h5 className="card-title">Como el estadístico calculado {chiSum}, es menor al estadístico de las tablas 
                                no se puede rechazar que los números sigan una distribución uniforme continua (Con un nivel de confianza {c}) </h5>
                                <div className="row">
                                    <div className="col-6 d-flex">
                                        <p className="card-text">Valor de las tablas: {chiValue}</p>
                                    </div>
                                </div>
                            </div>
                        </div>:<div className="card text-white bg-secondary mb-3" >
                            <div className="card-header">Se niega la hipotesis</div>
                            <div className="card-body">
                                <h5 className="card-title">Como el estadístico calculado {chiSum}, es mayor al estadístico de las tablas 
                                se puede rechazar que los números sigan una distribución uniforme continua (Con un nivel de confianza {c}) </h5>
                                <div className="row">
                                    <div className="col-6 d-flex">
                                        <p className="card-text">Valor de las tablas: {chiValue}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                    :
                    ''
                } 
            </div>
        </div>
    )
}

export default PruebaUnidormidadChiCuadrada