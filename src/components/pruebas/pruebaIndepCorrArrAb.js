import React, { useState, useEffect } from "react";

const PruebaIndepCorrArrAb = () => {
  let [rawList, setRawList] = useState("");
  let [corridas, setCorridas] = useState(0);
  let [mCo, setMco] = useState(0);
  let [chiCoSq, setChicoSq] = useState(0);
  let [zo, setZo] = useState(0);
  let [size, setSize] = useState(0);
  let [display, setDisplay] = useState(false);

  const calculate = () => {
    let r = inputToList();
    let n = r.length;
    let s = compareAdjacent(r);
    let corridas = calculateCorrida(s);
    let mco = calcMCO(n);
    let chiCo = calcChiCo(n);
    let zo = calcZo(corridas, mco, chiCo);

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
        <h1>Prueba: Corridas Arriba y Abajo</h1>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="">
            <textarea id="list" onChange={(e) => setRawList(e.target.value)} />
          </div>
        </div>
        <div className="row">
          <div className="">
            <div className="btn btn-secondary" onClick={(e) => calculate()}>
              Generar
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <p>Alfa = 5% (1.96)</p> <br />
      </div>
      <div className="row">
        <p>{getMessage()}</p>
      </div>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Tamaño</th>
              <th scope="col">Corridas</th>
              <th scope="col">mCo</th>
              <th scope="col">Chi2 Co</th>
              <th scope="col">Zo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{size}</td>
              <td>{corridas}</td>
              <td>{mCo.toFixed(5)}</td>
              <td>{chiCoSq.toFixed(5)}</td>
              <td>{zo.toFixed(5)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PruebaIndepCorrArrAb;
