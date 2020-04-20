import React, { useState, useEffect } from "react";
import { standardNormalTable } from "simple-statistics";
// const nums = [0.0449,0.1733,0.5746,0.049,0.8406,0.849,0.92,0.2564,0.6015,0.6694,0.3972,0.7025,0.1055,0.1247,0.1977,0.0125,0.63,0.2531,0.8297,0.6483,0.6972,0.9582,0.9085,0.8524,0.5514,0.0316,0.3587,0.7041,0.5915,0.2523,0.2545,0.3044,0.0207,0.1067,0.3857,0.1746,0.3362,0.1589,0.3727,0.4145]

const PruebaMedias = () => {
  let [c, setC] = useState("");
  let [currentNum, setCurrentNum] = useState("");
  let [numbersCSVString, setNumbersCSVString] = useState("");
  let [numbers, setNumbers] = useState([]);
  let [acepta, setAcepta] = useState(false);
  let [testRun, setTestRun] = useState(false);
  let [media, setMedia] = useState(0);
  let [alpha, setAlpha] = useState(0);
  let [limitI, setLimitI] = useState(0);
  let [limitS, setLimitS] = useState(0);

  useEffect(() => {
    let temp = (alpha * 0.01) / Math.pow(12 * numbers.length, 0.5);
    console.log(temp, alpha);
    setLimitI(0.5 - temp);
    setLimitS(0.5 + temp);
  }, [alpha, numbers.length]);

  useEffect(() => {
    if (limitI < media && limitS > media) {
      setAcepta(true);
    }
    if (media > 0) setTestRun(true);
  }, [limitI, limitS, media]);
  const addCSVValues = () => {
    if (parseFloat(c)) {
      let nums = numbersCSVString.split(",").map((e) => parseFloat(e));
      standardNormalTable.forEach((val, index) => {
        if (val === 1 - parseFloat(c) / 2) setAlpha(index);
      });
      setNumbers([...nums]);
    }
  };
  const addValueToArray = () => {
    setNumbers([...numbers, currentNum]);
    setCurrentNum("");
  };

  const calculateMed = () => {
    if (numbers.length > 0) {
      let sum = numbers.reduce((prev, curr) => {
        console.log(prev, curr);
        return (Number(prev) + Number(curr)).toFixed(4);
      });
      setMedia(sum / numbers.length);
    }
  };

  return (
    <div>
      <div className="row d-flex justify-content-center">
        <h1>Prueba de Medias</h1>
      </div>
      <div className="form-group">
        <small>
          <h7>Planteamiento de Hipotesis:</h7>
          <div className="col-12">
            <h7>H0</h7>
            <p>
              Dado el ṝ = {media.toFixed(4)}, se encuentra dentro de los límites
              y no se puede rechazar el planteamiento que el conjunto de números
              tiene media 0.5, con un nivel de confianza {(1 - c) * 100}%
            </p>
          </div>
          <div className="col-12">
            <h7>H1</h7>
            <p>
              Dado el ṝ = {media.toFixed(4)}, no se encuentra dentro de los
              límites se puede rechazar el planteamiento que el conjunto de
              números tiene media 0.5, con un nivel de confianza {(1 - c) * 100}
              %
            </p>
          </div>
        </small>
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
              <label for="csv">Ingresar numeros separados por comas:</label>
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
          <button
            className=" col-2 btn btn-primary ml-auto p-2"
            onClick={(e) => addCSVValues()}
          >
            Agregar Numeros
          </button>
          <div className="col-2 d-flex justify-content-end inputs">
            <div className="btn btn-primary" onClick={(e) => calculateMed()}>
              Correr Prueba
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {testRun ? (
          <div>
            {acepta ? (
              <div>
                <div className="card-body">
                  <h5 className="card-title">
                    Como el ṝ = {media.toFixed(5)}, se encuentra dentro de los
                    límites y no se puede rechazar el planteamiento que el
                    conjunto de números tiene media 0.5, con un nivel de
                    confianza {(1 - c) * 100}%
                  </h5>
                  <div className="row">
                    <div className="col-6 d-flex">
                      <h2 className="card-text">LI= {limitI.toFixed(5)}</h2>
                      <h2 className="card-text ml-auto p-2">
                        LS= {limitS.toFixed(5)}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="card-body">
                  <h5 className="card-title">
                    Como el ṝ = {media.toFixed(5)}, no se encuentra dentro de
                    los límites y se puede rechazar el planteamiento que el
                    conjunto de números tiene media 0.5, Con un nivel de
                    confianza {(1 - c) * 100}%
                  </h5>
                  <div className="row">
                    <div className="col-6 d-flex">
                      <h2 className="card-text">LI= {limitI.toFixed(5)}</h2>
                      <h2 className="card-text ml-auto p-2">
                        LS= {limitS.toFixed(5)}
                      </h2>
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

export default PruebaMedias;
