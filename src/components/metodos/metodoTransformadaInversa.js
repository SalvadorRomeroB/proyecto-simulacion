import React, { useState, useEffect } from "react";

const MetodoTransformadaInversa = () => {
  let [rawList, setRawList] = useState("");
  let [distSelected, setDistSelected] = useState(0);
  let [distName, setDistName] = useState("Selecciona una Distribución");
  let [distFormulaStr, setDistFormulaStr] = useState("");
  let [display, setDisplay] = useState(false);
  let [uniVarA, setUniVarA] = useState(0);
  let [uniVarBmA, setUniVarBmA] = useState(0);
  let [uniResults, setUniResults] = useState([]);
  let [expVarDelta, setExpVarDelta] = useState(0);
  let [expResults, setExpResults] = useState([]);
  let [berVarSuccess, setBerVarSuccess] = useState(0);
  let [berResults, setBerResults] = useState([]);
  let [poiVarProbSize, setPoiVarProbSize] = useState(0);
  let [poiVarDelta, setPoiVarDelta] = useState(0);
  let [poiResults, setPoiResults] = useState([]);

  useEffect(() => {
    if (distSelected === 1) {
      setDistName("Uniforme");
      setDistFormulaStr("𝑥𝑖=𝑎+(𝑏−𝑎)𝑟𝑖");
    } else if (distSelected === 2) {
      setDistName("Exponencial");
      setDistFormulaStr("𝑥𝑖=−1/𝜆 ln⁡(1−𝑟𝑖)");
    } else if (distSelected === 3) {
      setDistName("Bernoulli");
      setDistFormulaStr("𝑝(𝑋)=𝑝^𝑥 (1−𝑝)^(1−𝑥)");
    } else if (distSelected === 4) {
      setDistName("Poisson");
      setDistFormulaStr("𝑝(𝑥)=  (𝜆^𝑥 𝑒^(−𝜆))/𝑥!");
    }
  }, [distSelected]);

  const calcDistUniforme = (list) => {
    let tempUniResults = [];
    list.forEach((ri) => {
      let obj = {
        ri: ri,
        xi: uniVarA + uniVarBmA * ri,
      };
      tempUniResults.push(obj);
    });
    setUniResults(tempUniResults);
  };

  const calcDistExponencial = (list) => {
    let tempExpResults = [];
    list.forEach((ri) => {
      let obj = {
        ri: ri,
        xi: Math.log(1 - ri) * (1 / expVarDelta) * -1,
      };
      tempExpResults.push(obj);
    });
    setExpResults(tempExpResults);
  };

  const calcDistBernoulli = (list) => {
    let tempBerResults = [];
    list.forEach((ri) => {
      let obj = {
        ri: ri,
        xi: ri >= berVarSuccess ? 1 : 0,
      };
      tempBerResults.push(obj);
    });
    setBerResults(tempBerResults);
  };

  const factorial = (num) => {
    let rval = 1;
    for (let i = 2; i <= num; i++) rval = rval * i;
    return rval;
  };

  const getProbabilityForPoisson = () => {
    let table = [];
    let acumPx = 0;
    for (let i = 0; i <= poiVarProbSize; i++) {
      let px =
        (Math.pow(poiVarDelta, i) * Math.exp(-poiVarDelta)) / factorial(i);
      acumPx += px;
      let obj = {
        x: i,
        px: px.toFixed(4),
        acum: acumPx.toFixed(4),
      };
      table.push(obj);
    }
    return table;
  };

  const findInProbTable = (table, needle) => {
    let prevAcum = 0;

    for (let i = 0; i <= poiVarProbSize; i++) {
      if (needle >= prevAcum && needle <= table[i].acum) {
        return table[i].x;
      }
      prevAcum = table[i].acum;
    }
    return 0;
  };

  const calcDistPoisson = (list) => {
    let table = getProbabilityForPoisson();
    let tempPoissonResults = [];
    list.forEach((ri) => {
      let obj = {
        ri: ri,
        xi: findInProbTable(table, ri),
      };
      tempPoissonResults.push(obj);
    });
    setPoiResults(tempPoissonResults);
  };

  const calculate = () => {
    let list = inputToList();

    if (distSelected === 1) {
      calcDistUniforme(list);
    } else if (distSelected === 2) {
      calcDistExponencial(list);
    } else if (distSelected === 3) {
      calcDistBernoulli(list);
    } else if (distSelected === 4) {
      calcDistPoisson(list);
    }
    setDisplay(true);
  };

  const inputToList = () => {
    let cleanedList = rawList.split(",").map((x) => {
      return x.trim() * 1;
    });
    return cleanedList;
  };

  return (
    <div className="row">
      <div className="d-flex justify-content-center">
        <h1>Metodo de transformada Inversa</h1>
      </div>
      <div className="col-6 form-group">
        <div className="d-flex flex-column">
          <label for="csv">
            Ingresa los numeros separados por comas y luego elija la
            distribucion correspondiente:
          </label>
          <div className="d-flex">
            <textarea
              id="csv"
              type="text"
              value={rawList}
              onChange={(e) => setRawList(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {distName}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div
                className="dropdown-item"
                onClick={(e) => setDistSelected(1)}
              >
                Uniforme
              </div>
              <div
                className="dropdown-item"
                onClick={(e) => setDistSelected(2)}
              >
                Exponencial
              </div>
              <div
                className="dropdown-item"
                onClick={(e) => setDistSelected(3)}
              >
                Bernoulli
              </div>
              <div
                className="dropdown-item"
                onClick={(e) => setDistSelected(4)}
              >
                Poisson
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UNIFORME */}
      {distSelected === 1 && (
        <div>
          <div>
            <h3 className="col-12">{distFormulaStr}</h3>
          </div>
          <div className="col-8 form-group">
            <div className="input-group mb-3">
              <h3>a: </h3>

              <input
                type="number"
                min="100"
                max="999999"
                onChange={(e) => setUniVarA(e.target.value * 1)}
              />
            </div>

            <div className="input-group mb-3">
              <h3>(b-a): </h3>
              <input
                type="number"
                min="100"
                max="999999"
                onChange={(e) => setUniVarBmA(e.target.value * 1)}
              />
            </div>

            <div className="input-group mb-3">
              <div className="btn btn-primary" onClick={(e) => calculate()}>
                Calcular
              </div>
            </div>
          </div>
        </div>
      )}
      {display && distSelected === 1 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ri</th>
              <th scope="col">Xi</th>
            </tr>
          </thead>
          <tbody>
            {uniResults.map((e, k) => {
              return (
                <tr scope="row" key={k}>
                  <td>{k + 1}</td>
                  <td>{e.ri}</td>
                  <td>{e.xi.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {/* EXPONENCIAL */}
      {distSelected === 2 && (
        <div>
          <div>
            <h3 className="col-12">{distFormulaStr}</h3>
          </div>
          <div className="col-8 form-group">
            <div className="input-group mb-3">
              <h3>𝜆 : </h3>
              <input
                type="number"
                min="100"
                max="999999"
                onChange={(e) => setExpVarDelta(e.target.value * 1)}
              />
            </div>

            <div className="input-group mb-3">
              <div className="btn btn-primary" onClick={(e) => calculate()}>
                Calcular
              </div>
            </div>
          </div>
        </div>
      )}
      {display && distSelected === 2 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ri</th>
              <th scope="col">Xi</th>
            </tr>
          </thead>
          <tbody>
            {expResults.map((e, k) => {
              return (
                <tr scope="row" key={k}>
                  <td>{k + 1}</td>
                  <td>{e.ri}</td>
                  <td>{e.xi.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {/* BERNOULLI */}
      {distSelected === 3 && (
        <div>
          <div>
            <h3 className="col-12">{distFormulaStr}</h3>
          </div>
          <div className="col-8 form-group">
            <div className="input-group mb-3">
              <h3>P(Probabilidad de exito): </h3>
              <input
                type="number"
                onChange={(e) => setBerVarSuccess(e.target.value * 1)}
              />
            </div>

            <div className="input-group mb-3">
              <div className="btn btn-primary" onClick={(e) => calculate()}>
                Calcular
              </div>
            </div>
          </div>
        </div>
      )}
      {display && distSelected === 3 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ri</th>
              <th scope="col">Xi</th>
            </tr>
          </thead>
          <tbody>
            {berResults.map((e, k) => {
              return (
                <tr scope="row" key={k}>
                  <td>{k + 1}</td>
                  <td>{e.ri}</td>
                  <td>{e.xi}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {/* POISSON */}
      {distSelected === 4 && (
        <div>
          <div>
            <h3 className="col-12">{distFormulaStr}</h3>
          </div>
          <div className="col-6 form-group">
            <div className="input-group mb-3">
              <h3>𝜆 : </h3>

              <input
                type="number"
                onChange={(e) => setPoiVarDelta(e.target.value * 1)}
              />
            </div>

            <h4>N(Numero de probabilidades a calcular) : </h4>
            <div className="input-group mb-3">
              <input
                type="number"
                onChange={(e) => setPoiVarProbSize(e.target.value * 1)}
              />
            </div>

            <div className="input-group mb-3">
              <div className="btn btn-primary" onClick={(e) => calculate()}>
                Calcular
              </div>
            </div>
          </div>
        </div>
      )}
      {display && distSelected === 4 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ri</th>
              <th scope="col">Xi</th>
            </tr>
          </thead>
          <tbody>
            {poiResults.map((e, k) => {
              return (
                <tr scope="row" key={k}>
                  <td>{k + 1}</td>
                  <td>{e.ri}</td>
                  <td>{e.xi}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MetodoTransformadaInversa;

/*
UNI
0.48,
0.82,
0.69,
0.67,
0
EXP
0.64,
0.83,
0.03,
0.50,
0.21
BER
0.453,
0.823,
0.034,
0.503,
0.891
POISSON
0.6754,
0.0234,
0.7892,
0.5134,
0.3331
*/
