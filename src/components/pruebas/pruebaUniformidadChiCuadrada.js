import React, { useEffect, useState } from "react";
import jStat from "jstat";
import { standardNormalTable } from "simple-statistics";
import chi from "chi-squared";
import chiSquareInverse from "inv-chisquare-cdf";

const PruebaUnidormidadChiCuadrada = () => {
  let [c, setC] = useState("");
  let [n, setN] = useState(0);
  let [m, setM] = useState(0);
  let [currentNum, setCurrentNum] = useState("");
  let [numbersCSVString, setNumbersCSVString] = useState("");
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
      eioiei,
    };
  };

  useEffect(() => {
    if (chiValue > chiSum) {
      setAcepta(true);
    }
    if (testTable.length > 0) setTestRun(true);
  }, [chiSum, chiValue, testTable.length]);

  useEffect(() => {
    let degreeFreed = m > 2 ? m - 1 : 1;
    setChiValue(chiSquareInverse.invChiSquareCDF(1 - alpha / 2, degreeFreed));
  }, [alpha, m]);

  const addCSVValues = () => {
    if (parseFloat(c)) {
      let nums = numbersCSVString.split(",").map((e) => parseFloat(e));
      setAlpha(parseFloat(c));
      setNumbers([...nums]);
      setN(nums.length);
      setM(Math.pow(nums.length, 0.5));
    }
  };
  const addValueToArray = () => {
    setNumbers([...numbers, currentNum]);
    setCurrentNum("");
  };

  const calculateUni = () => {
    if (numbers.length > 0) {
      let ei = n / m;
      let temp = [...testTable];
      let tempEi = [];
      for (let i = 0; i < m; i++) {
        let oi = numbers.filter((e) => e > 0.1 * i && e < 0.1 * (i + 1)).length;
        let eioisquaredei = Math.pow(ei - oi, 2) / ei;
        temp.push(
          getObject(`[${0.01 * i}-${0.01 * (i + 1)}]`, oi, ei, eioisquaredei)
        );
        tempEi.push(eioisquaredei);
      }
      setTestTable(temp);
      setChiSum(tempEi.reduce((prev, curr) => prev + curr));
    }
  };

  return (
    <div>
      <div className="row d-flex justify-content-center">
        <h1>Prueba de Uniformidad Chi-Cuadrada</h1>
      </div>

      <small>
        <h7>Planteamiento de hipotesis:</h7>
        <div className="col-12">
          <h7>H0</h7>
          <p>
            Como el estadístico calculado {chiSum.toFixed(4)}, es menor al
            estadístico de las tablas {chiValue.toFixed(4)}
            no se puede rechazar que los números sigan una distribución uniforme
            continua, con un nivel de confianza {(1 - c) * 100}%
          </p>
        </div>
        <div className="col-12">
          <h7>H1</h7>
          <p>
            Como el estadístico calculado {chiSum.toFixed(4)}, es mayor al
            estadístico de las tablas {chiValue.toFixed(4)}
            se puede rechazar que los números sigan una distribución uniforme
            continua, con un nivel de confianza {(1 - c) * 100}%
          </p>
        </div>
      </small>
      <div className="form-group">
        <div className="row">
          <div className="col-4 d-flex justify-content-between inputs">
            <label for="semilla">Alpha:</label>
            <input
              id="semilla"
              type="text"
              value={c}
              onChange={(e) => setC(e.target.value)}
            />
          </div>
        </div>
        <div className="row ">
          <div className="col-6 d-flex flex-column">
            <div className="d-flex flex-column">
              <label for="csv">Ingresar digitos separados por comas:</label>
              <div className="d-flex">
                <textarea
                  id="csv"
                  type="text"
                  value={numbersCSVString}
                  onChange={(e) => setNumbersCSVString(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-6 d-flex flex-wrap inputs">
            {numbers.map((num) => {
              return <p className="number-list">{num}</p>;
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-4 d-flex justify-content-end inputs">
            <div
              className="btn btn-primary ml-auto p-2"
              onClick={(e) => addCSVValues()}
            >
              Agregar Numeros
            </div>
            <div className="btn btn-primary" onClick={(e) => calculateUni()}>
              Correr Prueba
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {testRun ? (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Intervalo</th>
                  <th>Oi</th>
                  <th>Ei = n/m</th>
                  <th>(Ei-Oi)^2/Ei</th>
                </tr>
              </thead>
              <tbody>
                {testTable.map((e) => {
                  {
                    return (
                      <tr>
                        <td>{e.interval}</td>
                        <td>{e.oi}</td>
                        <td>{e.ei}</td>
                        <td>{e.eioiei}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
            {acepta ? (
              <div>
                <div className="card-body">
                  <h5 className="card-title">
                    Como el estadístico calculado {chiSum.toFixed(4)}, es menor
                    al estadístico de las tablas no se puede rechazar que los
                    números sigan una distribución uniforme continua, con un
                    nivel de confianza {(1 - c) * 100}%
                  </h5>
                  <div className="row">
                    <div className="col-6 d-flex">
                      <p className="card-text">Valor de tabla: {chiValue}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="card-body">
                  <h5 className="card-title">
                    Como el estadístico calculado {chiSum.toFixed(4)}, es mayor
                    al estadístico de las tablas se puede rechazar que los
                    números sigan una distribución uniforme, con un nivel de
                    confianza {(1 - c) * 100}%
                  </h5>
                  <div className="row">
                    <div className="col-6 d-flex">
                      <p className="card-text">
                        Valor de las tablas: {chiValue.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PruebaUnidormidadChiCuadrada;
