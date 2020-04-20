import React, { useState, useEffect } from "react";
import { standardNormalTable } from "simple-statistics";

const PruebaIndepCorrArrAb = () => {
  let [c, setC] = useState("");
  let [testRun, setTestRun] = useState("");
  let [acepta, setAcepta] = useState("");
  let [rawList, setRawList] = useState("");
  let [corridas, setCorridas] = useState(0);
  let [mCo, setMco] = useState(0);
  let [chiCoSq, setChicoSq] = useState(0);
  let [zo, setZo] = useState(0);
  let [size, setSize] = useState(0);
  let [display, setDisplay] = useState(false);
  let [alpha, setAlpha] = useState(0);

  useEffect(() => {
    if (zo < alpha) {
      setAcepta(true);
    }
    if (zo > 0) {
      setTestRun(true);
    }
  }, [alpha, zo]);
  const calculate = () => {
    let r = inputToList();
    let n = r.length;
    let s = compareAdjacent(r);
    let corridas = calculateCorrida(s);
    let mco = calcMCO(n);
    let chiCo = calcChiCo(n);
    let zo = calcZo(corridas, mco, chiCo);
    standardNormalTable.forEach((val, index) => {
      if (val === 1 - parseFloat(c) / 2) setAlpha(index);
    });

    setSize(n);
    setCorridas(corridas);
    setMco(mco);
    setChicoSq(chiCo);
    setZo(zo);
    setDisplay(true);
  };

  const inputToList = () => {
    let cleanedList = rawList.split(",").map((x) => {
      return x.trim();
    });
    return cleanedList;
  };

  const compareAdjacent = (list) => {
    let s = [];
    for (let i = 1; i < list.length; i++) {
      if (list[i - 1] <= list[i]) {
        s.push(1);
      } else {
        s.push(0);
      }
    }
    return s;
  };

  const calculateCorrida = (s) => {
    let flag = s[0];
    let Co = 1;
    s.forEach((x) => {
      if (x !== flag) {
        Co++;
        flag = x;
      }
    });
    return Co;
  };

  const calcMCO = (n) => {
    return (2 * n - 1) / 3;
  };

  const calcChiCo = (n) => {
    return (16 * n - 29) / 90;
  };

  const calcZo = (co, mco, chiCo) => {
    return Math.abs((co - mco) / Math.sqrt(chiCo));
  };

  const getMessage = () => {
    if (display) {
      if (zo <= 1.96) {
        return "No se puede rechazar Ho";
      } else {
        return "Se rechaza Ho";
      }
    }
  };

  return (
    <div>
      <div className="row d-flex justify-content-center">
        <h1>Prueba Independencia Corridas Arriba y Abajo</h1>
      </div>
      <small>
        <h7>Planteamiento de Hipotesis:</h7>
        <div className="col-12">
          <h7>H0</h7>
          <p>
            Dado el Z0 = {zo.toFixed(4)}, tiene un valor menor al de la tabla{" "}
            {alpha * 0.01} no se puede rechazar el planteamiento que el conjunto
            de números son independientes, con un nivel de confianza{" "}
            {(1 - c) * 100}%
          </p>
        </div>
        <div className="col-12">
          <h7>H1</h7>
          <p>
            Dado el Z0 = {zo.toFixed(4)}, tiene un valor mayor al de la tabla{" "}
            {alpha * 0.01} se puede rechazar el planteamiento que el conjunto de
            números son independientes, con un nivel de confianza{" "}
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
        <div className="row">
          <div className="d-flex flex-column">
            <label for="csv">Ingresar numeros separados por comas:</label>
            <div className="d-flex">
              <textarea
                id="csv"
                type="text"
                value={rawList}
                onChange={(e) => setRawList(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="btn btn-primary" onClick={(e) => calculate()}>
          Correr Prueba
        </div>
        <div className="row">
          {testRun ? (
            <div className="col-12">
              <div className="row d-flex border-bottom">
                <div className="col ">Tamaño:</div>
                <div className="col">{size}</div>
              </div>
              <div className="row d-flex border-bottom">
                <div className="col-6">Corridas:</div>
                <div className="col-6">{corridas}</div>
              </div>
              <div className="row d-flex border-bottom">
                <div className="col-6">mCo:</div>
                <div className="col-6">{mCo.toFixed(5)}</div>
              </div>
              <div className="row d-flex border-bottom">
                <div className="col-6">Chi2 Co:</div>
                <div className="col-6">{chiCoSq.toFixed(5)}</div>
              </div>
              <div className="row d-flex border-bottom">
                <div className="col-6">Zo:</div>
                <div className="col-6">{zo.toFixed(5)}</div>
              </div>
              {acepta ? (
                <div>
                  <div className="card-header">
                    No se puede negar la hipotesis
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      Dado el Zo = {zo.toFixed(5)}, tiene un valor menor al de
                      la tabla no se puede rechazar el planteamiento que son
                      independientes, con un nivel de confianza {(1 - c) * 100}%
                    </h5>
                    <div className="row">
                      <div className="col-6 d-flex">
                        <h2 className="card-text">
                          Zo de tabla= {alpha * 0.01}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="card-header">Se niega la hipotesis</div>
                  <div className="card-body">
                    <h5 className="card-title">
                      Dado el Zo = {zo.toFixed(5)}, tiene un valor mayor al de
                      la tabla se puede rechazar el planteamiento que son
                      independientes, con un nivel de confianza {(1 - c) * 100}%
                    </h5>
                    <div className="row">
                      <div className="col-6 d-flex">
                        <h2 className="card-text ml-auto p-2">
                          Zo de tabla= {alpha * 0.01}
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
    </div>
  );
};

export default PruebaIndepCorrArrAb;
