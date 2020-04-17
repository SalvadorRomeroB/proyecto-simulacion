import React, { useState, useEffect } from "react";

const PruebaHuecos = () => {
  let [rawList, setRawList] = useState("");
  let [minInter, setMinInter] = useState(0);
  let [maxInter, setMaxInter] = useState(1);
  let [table, setTable] = useState([]);
  let [H, setH] = useState(0);
  let [estTotal, setEstTotal] = useState(0);
  let [display, setDisplay] = useState(false);
  const X2 = 11.07;

  const calculate = () => {
    let list = inputToList();
    let normList = normalizeList(list);
    let table = fillTable(normList);

    setTable(table);
    setDisplay(true);
  };

  const inputToList = () => {
    let cleanedList = rawList.split(",").map((x) => {
      return x.trim();
    });
    return cleanedList;
  };

  // agrega 1 si el numero esta dentro de los intervalos, 0 si no
  const normalizeList = (list) => {
    let newList = [];
    list.forEach((x) => {
      if (minInter <= x && x <= maxInter) {
        newList.push(1);
      } else {
        newList.push(0);
      }
    });
    return newList;
  };

  // llama a todos los metodos necesarios para llenar la tabla
  const fillTable = (list) => {
    let { firstTable, H } = getOi(list);
    setH(H);
    let table = getEi(firstTable, H);
    return getEstadistico(table);
  };

  // cuenta los hoyos con un tamaño dado
  const getOi = (list) => {
    console.log(list);
    let firstOne = list.indexOf(1);
    let H = 0;
    let table = [
      { i: 0, oi: 0, ei: 0, f: 0 },
      { i: 1, oi: 0, ei: 0, f: 0 },
      { i: 2, oi: 0, ei: 0, f: 0 },
      { i: 3, oi: 0, ei: 0, f: 0 },
      { i: 4, oi: 0, ei: 0, f: 0 },
      { i: 5, oi: 0, ei: 0, f: 0 },
    ];
    for (let h = 0; h <= 5; h++) {
      let holes = 0;
      for (let i = firstOne; i < list.length - 1; i++) {
        for (let k = i + 1; k < list.length; k++) {
          if (list[k] === 1) {
            if (list[i] === list[k]) {
              if (h === holes) {
                table[h].oi += 1;
                H++;
              } else if (h === 5 && holes >= 5) {
                table[h].oi += 1;
                H++;
              }
              i = k;
            }
            holes = 0;
          } else {
            holes++;
          }
        }
      }
    }
    return { firstTable: table, H: H };
  };

  // set values for the EI column
  const getEi = (table, H) => {
    table.forEach((obj) => {
      obj.ei =
        H * (maxInter - minInter) * Math.pow(1 - (maxInter - minInter), obj.i);
    });
    return table;
  };

  // set values for the Last column
  const getEstadistico = (table) => {
    let total = 0;
    table.forEach((obj) => {
      obj.f = Math.pow(obj.ei - obj.oi, 2) / obj.ei;
      total += obj.f;
    });
    setEstTotal(total);
    return table;
  };

  const getResultMessage = () => {
    if (display) {
      if (estTotal < X2) {
        return (
          "No se puede rechazar la Ho: " + estTotal.toFixed(2) + " < " + X2
        );
      } else {
        return "Se rechaza la Ho: " + +estTotal.toFixed(2) + " > " + X2;
      }
    }
  };

  return (
    <div>
      <div className="row d-flex justify-content-center">
        <h1>Prueba: Huecos</h1>
      </div>
      <div className="form-group">
        <div className="row">
          <p>Ingresa los intervalos de prueba: </p>
        </div>
        <div className="row">
          <div className="col-6 justify-content-end inputs">
            <label htmlFor="intervalo0">Intervalo 0:</label>
            <input
              id="intervalo0"
              type="number"
              min="0"
              max="1"
              onChange={(e) => setMinInter(e.target.value * 1)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6 justify-content-end inputs">
            <label htmlFor="interval1">Intervalo 1:</label>
            <input
              id="intervalo1"
              type="number"
              min="0"
              max="1"
              onChange={(e) => setMaxInter(e.target.value * 1)}
            />
          </div>
        </div>
        <div className="row">
          <div className="">
            <textarea id="list" onChange={(e) => setRawList(e.target.value)} />
          </div>
        </div>
        <div className="row">X^2 alpha, m-1:{X2}</div>
        <div className="row">
          <div className="">
            <div className="btn btn-secondary" onClick={(e) => calculate()}>
              Generar
            </div>
          </div>
        </div>
        <div className="row">
          <p>{getResultMessage()}</p>
        </div>
      </div>

      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Tamaño Hueco</th>
              <th scope="col">Oi</th>
              <th scope="col">Ei</th>
              <th scope="col">Estadistico</th>
            </tr>
          </thead>
          <tbody>
            {table.map((e) => {
              return (
                <tr scope="row" key={e.i}>
                  <td>{e.i}</td>
                  <td>{e.oi}</td>
                  <td>{e.ei.toFixed(3)}</td>
                  <td>{e.f.toFixed(3)}</td>
                </tr>
              );
            })}
            <tr scope="row">
              <td>TOTAL</td>
              <td>H={H}</td>
              <td>H={H}</td>
              <td>{estTotal.toFixed(3)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PruebaHuecos;
