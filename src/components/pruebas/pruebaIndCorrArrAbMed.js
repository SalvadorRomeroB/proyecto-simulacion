import React, { useState, useEffect } from "react";
import { standardNormalTable } from "simple-statistics";

const PruebaCorrArrAbMed = () => {
  let [c, setC] = useState("");
  let [alpha, setAlpha] = useState(0);
  let [acepta, setAcepta] = useState(false);
  let [testRun, setTestRun] = useState(false);
  let [numeros, setNumeros] = useState("");
  let [N, setN] = useState(0);
  let [C0, setC0] = useState(0);
  let [N1, setN1] = useState(0);
  let [N0, setN0] = useState(0);
  let [MC0, setMC0] = useState(0);
  let [VariazaC0, setVariazaC0] = useState(0);
  let [Z0, setZ0] = useState(0);
  let [Hipot, setHipot] = useState("");

  useEffect(() => {
    if (Z0 < alpha && Z0 > -alpha) {
      setAcepta(true);
    }
    if (alpha > 0) {
      setTestRun(true);
    }
  }, [alpha, Z0]);
  const prueba = () => {
    let tempArr = numeros.split(",");
    let n = tempArr.length;
    setN(n);
    let media = 0.5;
    let countSwitch = 0;
    let swithflag = 0;

    let count1 = tempArr.reduce((a, b) => {
      let temp = parseFloat(b.trim()) > media ? 1 : 0;
      if (temp != swithflag) {
        countSwitch++;
        swithflag = !swithflag;
      }
      return parseInt(a) + temp;
    }, 0);
    let count0 = n - count1;

    setC0(countSwitch);
    setN1(count1);
    setN0(count0);
    let mc0 = (2 * count1 * count0) / n + 1 / 2;
    setMC0(mc0);

    let variazaC0 =
      (2 * count0 * count1 * (2 * count0 * count1 - n)) / (n * n * (n - 1));
    setVariazaC0(variazaC0);
    standardNormalTable.forEach((val, index) => {
      if (val === 1 - parseFloat(c) / 2) setAlpha(index);
    });
    let z0 = Math.abs((countSwitch - mc0) / Math.sqrt(variazaC0));
    setZ0(z0);
  };

  return (
    <div>
      <div className="row d-flex justify-content-center">
        <h1>Prueba Independencia Corridas Arriba y Abajo Media</h1>
      </div>
      <small>
        <h7>Planteamiento de Hipotesis:</h7>
        <div className="col-12">
          <h7>H0</h7>
          <p>
            Como el valor Z0 = {Z0.toFixed(4)} cae dentro de nuestro intervalo
            (-{alpha * 0.01}, {alpha * 0.01}) no podemos rechazar que los
            números sean independientes, con un nivel de confianza{" "}
            {(1 - c) * 100}%
          </p>
        </div>
        <div className="col-12">
          <h7>H1</h7>
          <p>
            Como el valor Z0 = {Z0.toFixed(4)} no cae dentro de nuestro
            intervalo (-{alpha * 0.01}, {alpha * 0.01}) podemos rechazar que los
            números sean independientes, con un nivel de confianza{" "}
            {(1 - c) * 100}%
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
        <div className="d-flex flex-column">
          <label for="csv">Ingresar numeros separados por comas:</label>
          <div className="d-flex">
            <textarea
              id="csv"
              type="text"
              value={numeros}
              onChange={(e) => setNumeros(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div className="btn btn-primary" onClick={(e) => prueba()}>
            Correr Prueba
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        {testRun ? (
          <div>
            <div className="row d-flex border-bottom">
              <div className="col ">N:</div>
              <div className="col">{N}</div>
            </div>
            <div className="row d-flex border-bottom">
              <div className="col-6">Co:</div>
              <div className="col-6">{C0}</div>
            </div>
            <div className="row d-flex border-bottom">
              <div className="col-6">N1:</div>
              <div className="col-6">{N1}</div>
            </div>
            <div className="row d-flex border-bottom">
              <div className="col-6">No:</div>
              <div className="col-6">{N0}</div>
            </div>
            <div className="row d-flex border-bottom">
              <div className="col-6">MCo:</div>
              <div className="col-6">{MC0}</div>
            </div>
            <div className="row d-flex border-bottom">
              <div className="col-6">VariazaC0:</div>
              <div className="col-6">{VariazaC0.toFixed(4)}</div>
            </div>
            <div className="row d-flex border-bottom">
              <div className="col-6">Zo:</div>
              <div className="col-6">{Z0.toFixed(4)}</div>
            </div>
            {acepta ? (
              <div>
                <div className="card-body">
                  <h5 className="card-title">
                    Como el valor Zo = {Z0.toFixed(4)} cae dentro de nuestro
                    intervalo (-
                    {alpha * 0.01}, {alpha * 0.01}) no podemos rechazar que los
                    números sean independientes, con un nivel de confianza{" "}
                    {(1 - c) * 100}%
                  </h5>
                  <h2>Zo = {Z0.toFixed(4)}</h2>
                </div>
              </div>
            ) : (
              <div>
                <div className="card-body">
                  <h5 className="card-title">
                    Como el valor Zo = {Z0.toFixed(4)} no cae dentro de nuestro
                    intervalo (-{alpha * 0.01}, {alpha * 0.01}) podemos rechazar
                    que los números sean independientes , con un nivel de
                    confianza {(1 - c) * 100}%
                  </h5>

                  <h2>Zo = {Z0.toFixed(4)}</h2>
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

export default PruebaCorrArrAbMed;
