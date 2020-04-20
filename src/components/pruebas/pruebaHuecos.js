import React, { useState, useEffect } from "react";
import chiSquareInverse from "inv-chisquare-cdf";

const PruebaHuecos = () => {
  let [c, setC] = useState(0);
  let [numbersCSVString, setNumbersCSVString] = useState("");
  let [currentNum, setCurrentNum] = useState("");
  let [alpha, setAlpha] = useState(0);
  let [acepta, setAcepta] = useState(false);
  let [testRun, setTestRun] = useState(false);
  let [numbers, setNumbers] = useState([]);
  let [minInter, setMinInter] = useState(0);
  let [maxInter, setMaxInter] = useState(1);
  let [table, setTable] = useState([]);
  let [H, setH] = useState(0);
  let [estTotal, setEstTotal] = useState(0);
  let [display, setDisplay] = useState(false);
  let [X2, setx2] = useState(0);

  useEffect(() => {
    if (X2 > estTotal) {
      setAcepta(true);
    }
    if (X2 > 0 && estTotal > 0) {
      setTestRun(true);
    }
  }, [X2, estTotal]);
  useEffect(() => {
    if (alpha > 0) {
      setx2(chiSquareInverse.invChiSquareCDF(1 - alpha / 2, 4));
    }
  }, [alpha]);

  const calculate = () => {
    let list = [...numbers];
    let normList = normalizeList(list);
    let table = fillTable(normList);
    setTable(table);
    setDisplay(true);
  };

  const addValueToArray = () => {
    let temp = [...numbers, currentNum];
    setNumbers(temp);
    setCurrentNum("");
  };

  const addCSVValues = () => {
    if (parseFloat(c)) {
      let nums = numbersCSVString.split(",").map((e) => parseFloat(e));
      setAlpha(parseFloat(c));
      setNumbers([...nums]);
    }
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

  return (
    <div>
      <div className="row d-flex justify-content-center">
        <h1>Prueba de Huecos</h1>
      </div>
      <small>
        <h7>Planteamiento de Hipotesis:</h7>
        <div className="col-12">
          <h7>H0</h7>
          <p>
            {" "}
            El valor obtenido de X0^2 {estTotal.toFixed(4)} es menor al
            estadístico de tabla = {X2.toFixed(4)}, entonces no se puede
            rechazar que los números del conjunto sean independientes, con un
            nivel de confianza {(1 - c) * 100}%
          </p>
        </div>
        <div className="col-12">
          <h7>H1</h7>
          <p>
            El valor obtenido de X0^2 {estTotal.toFixed(4)} es mayor al
            estadístico de tabla = {X2.toFixed(4)}, entonces rechazamos que los
            números del conjunto sean independientes, con un nivel de confianza{" "}
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
          <p>Intervalos de prueba: </p>
        </div>
        <div className="row">
          <div className="col-2 justify-content-end inputs">
            <label htmlFor="intervalo0">Intervalo 0: </label>
            <input
              id="intervalo0"
              type="number"
              min="0"
              max="1"
              onChange={(e) => setMinInter(e.target.value * 1)}
            />
          </div>
          <div className="col-2 justify-content-end inputs">
            <label htmlFor="interval1">Intervalo 1 : </label>
            <input
              id="intervalo1"
              type="number"
              min="0"
              max="1"
              onChange={(e) => setMaxInter(e.target.value * 1)}
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
          <div className="col-4 d-flex justify-content-end inputs">
            <div
              className="btn btn-primary ml-auto p-2"
              onClick={(e) => addCSVValues()}
            >
              Agregar Numeros
            </div>
            <div className="btn btn-primary" onClick={(e) => calculate()}>
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
            {acepta ? (
              <div>
                <div className="card-header">
                  No se puede negar la hipotesis
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    Como el estadístico calculado {estTotal.toFixed(4)}, es
                    menor al estadístico de las tablas no se puede rechazar que
                    los números sigan una distribución uniforme continua, con un
                    nivel de confianza {(1 - c) * 100}%
                  </h5>
                  <div className="row">
                    <div className="col-6 d-flex">
                      <h2 className="card-text">
                        Valor de la tabla: {X2.toFixed(4)}
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
                    Como el estadístico calculado {estTotal.toFixed(4)}, es
                    mayor al estadístico de las tablas se puede rechazar que los
                    números sigan una distribución uniforme continuacon, con un
                    nivel de confianza {(1 - c) * 100}%
                  </h5>
                  <div className="row">
                    <div className="col-6 d-flex">
                      <h2 className="card-text">
                        Valor de la tabla: {X2.toFixed(4)}
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

export default PruebaHuecos;
