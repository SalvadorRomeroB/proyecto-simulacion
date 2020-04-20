import React, { useState, useEffect } from "react";

const MetodoConvolucion = () => {
  let [distSelected, setDistSelected] = useState(0);
  let [distName, setDistName] = useState("Selecciona una Distribución");
  let [distFormulaStr, setDistFormulaStr] = useState("");
  let [display, setDisplay] = useState(false);
  // ERLANG
  let [num_erlang, setNum_erlang] = useState(0);
  let [media_erlang, setMedia_erlang] = useState(0);
  let [cantidad_piezas_erlang, setCantidad_piezas_erlang] = useState(0);
  let [valores_Xi_erlang, setValores_Xi_erlang] = useState([]);
  let [erlangResult, setErlangResult] = useState([]);

  // NORMAL
  let [norMedia, setNorMedia] = useState(0);
  let [norDS, setNorDS] = useState(0);
  let [norRandomN, setNorRandomN] = useState(0);
  let [norResults, setNorResults] = useState([]);
  // BINOMIAL
  let [biProb, setBiProb] = useState(0);
  let [biN, setBiN] = useState(0);
  let [biDef, setBiDef] = useState([]);

  useEffect(() => {
    if (distSelected === 1) {
      setDistName("Erlang");
      setDistFormulaStr("𝑌=𝐸𝑅𝑖=−1/𝑘𝜆 𝑙𝑛 ∏(𝑖=1)^𝑘:(1−𝑟𝑖) ");
    } else if (distSelected === 2) {
      setDistName("Normal");
      setDistFormulaStr("𝑋=𝑁𝑖= [∑_(𝑖=1)^12:(𝑟𝑖) −6 ]+𝜎+𝜇");
    } else if (distSelected === 3) {
      setDistName("Binomial");
      setDistFormulaStr("𝑌=𝐵𝑖=𝐵𝐸1+𝐵𝐸2+ …+𝐵𝐸𝑁 ~𝐵𝐼(𝑁,𝑝)");
    }
  }, [distSelected]);

  const calcDistErlang = () => {
    let num_random = [];
    let valores_Xi = [];
    let result = [];

    for (let i = 0; i < num_erlang; i++) {
      num_random.push([]);
      for (let e = 0; e < cantidad_piezas_erlang; e++) {
        num_random[i][e] = parseFloat(
          (1 - (Math.random() * (0.9999 - 0.0001) + 0.0001)).toFixed(4)
        );
      }
    }

    let multi = 1;
    for (let i = 0; i < cantidad_piezas_erlang; i++) {
      for (let j = 0; j < num_erlang; j++) {
        multi *= num_random[j][i];
      }
      let value = ((-media_erlang / num_erlang) * Math.log(multi)).toFixed(4);
      valores_Xi.push(value);
      multi = 1;
    }

    for (let i = 0; i < cantidad_piezas_erlang; i++) {
      let rs = [];
      for (let j = 0; j < num_erlang; j++) {
        rs.push(num_random[j][i]);
      }
      let obj = {
        rs: rs.toString(),
        y: valores_Xi[i],
      };
      result.push(obj);
    }

    setValores_Xi_erlang(valores_Xi);
    setErlangResult(result);
    console.log("num random", num_random);
    console.log("valores xi", valores_Xi);
  };

  const calcDistNormal = () => {
    let num_random = [];
    let valores_Xi = [];
    let suma_r = [];
    let resta_r = [];
    let tabla = [];

    for (let i = 0; i < norRandomN * 12; i++) {
      num_random[i] = parseFloat(
        (1 - (Math.random() * (0.9999 - 0.0001) + 0.0001)).toFixed(4)
      );
    }

    for (let i = 0; i < norRandomN * 12; i += 12) {
      let count = 0;
      for (let e = 0; e < 12; e++) {
        count += num_random[i + e];
      }
      suma_r.push(count.toFixed(4));
      resta_r.push((count - 6).toFixed(4));
    }

    for (let i = 0; i < norRandomN; i++) {
      valores_Xi[i] = parseFloat(resta_r[i]) + norDS + norMedia;
    }

    for (let i = 0; i < norRandomN; i++) {
      let obj = {
        suma: suma_r[i],
        resta: resta_r[i],
        xi: valores_Xi[i],
      };
      tabla.push(obj);
    }

    setNorResults(tabla);
    /*
        console.log("num random", num_random);
        console.log("valores xi", valores_Xi);
        console.log("suma_r", suma_r)*/
  };

  const calcDistBinomial = () => {
    let num_random = [];
    let valores_Xi = [];
    let error = 1 - biProb * 0.01;
    let valores_df = [];

    for (let i = 0; i < biN; i++) {
      num_random.push([]);
      valores_Xi.push([]);
      for (let e = 0; e < biN; e++) {
        num_random[i][e] = parseFloat(
          (1 - (Math.random() * (0.9999 - 0.0001) + 0.0001)).toFixed(4)
        );
      }
    }

    for (let i = 0; i < biN; i++) {
      for (let j = 0; j < biN; j++) {
        if (num_random[j][i] <= error) {
          valores_Xi[j][i] = 1;
        } else {
          valores_Xi[j][i] = 0;
        }
      }
    }

    for (let i = 0; i < biN; i++) {
      let count = 0;
      for (let j = 0; j < biN; j++) {
        if (valores_Xi[j][i] === 1) {
          count++;
        }
      }
      valores_df.push(count);
    }

    setBiDef(valores_df);
    console.log("num random", num_random);
    console.log("valores xi", valores_Xi);
    console.log("valores df", valores_df);
  };

  const calculate = () => {
    if (distSelected === 1) {
      calcDistErlang();
    } else if (distSelected === 2) {
      calcDistNormal();
    } else if (distSelected === 3) {
      calcDistBinomial();
    }
    setDisplay(true);
  };

  return (
    <div>
      <div className="row d-flex justify-content-center">
        <h1>Metodo de Convolución</h1>
      </div>

      <div className="form-group">
        <div className="row d-flex justify-content-center">
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
                Erlang
              </div>
              <div
                className="dropdown-item"
                onClick={(e) => setDistSelected(2)}
              >
                Normal
              </div>
              <div
                className="dropdown-item"
                onClick={(e) => setDistSelected(3)}
              >
                Binomial
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ERLANG */}
      {distSelected === 1 && (
        <div>
          <div>
            <h3 className="row d-flex justify-content-center">
              {distFormulaStr}
            </h3>
          </div>
          <div className="form-group">
            <div className="input-group mb-3">
              <h3>Erlang: </h3>

              <input
                type="number"
                min="100"
                max="999999"
                onChange={(e) => setNum_erlang(e.target.value * 1)}
              />
            </div>

            <div className="input-group mb-3">
              <h3>Media: </h3>

              <input
                type="number"
                min="100"
                max="999999"
                onChange={(e) => setMedia_erlang(e.target.value * 1)}
              />
            </div>

            <div className="input-group mb-3">
              <h3>Piezas: </h3>
              <input
                type="number"
                min="100"
                max="999999"
                onChange={(e) => setCantidad_piezas_erlang(e.target.value * 1)}
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
            {erlangResult.map((e, k) => {
              return (
                <tr key={k}>
                  <td>{k + 1}</td>
                  <td>{e.rs}</td>
                  <td>{e.y}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {/* NORMAL */}
      {distSelected === 2 && (
        <div>
          <div>
            <h3 className="row d-flex justify-content-center">
              {distFormulaStr}
            </h3>
          </div>
          <div className="form-group">
            <div className="input-group mb-3">
              <h3>Media: </h3>

              <input
                type="number"
                min="100"
                max="999999"
                onChange={(e) => setNorMedia(e.target.value * 1)}
              />
            </div>

            <div className="input-group mb-3">
              <h3>Desviacion estandar: </h3>

              <input
                type="number"
                min="100"
                max="999999"
                onChange={(e) => setNorDS(e.target.value * 1)}
              />
            </div>

            <div className="input-group mb-3">
              <h3>Numero de Variables Aleatorias: </h3>

              <input
                type="number"
                min="100"
                max="999999"
                onChange={(e) => setNorRandomN(e.target.value * 1)}
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
              <th scope="col">suma</th>
              <th scope="col">resta</th>
              <th scope="col">xi</th>
            </tr>
          </thead>
          <tbody>
            {norResults.map((e, k) => {
              return (
                <tr scope="row" key={k}>
                  <td>{k + 1}</td>
                  <td>{e.suma}</td>
                  <td>{e.resta}</td>
                  <td>{e.xi.toFixed(4)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {/* BINOMIAL */}
      {distSelected === 3 && (
        <div>
          <div>
            <h3 className="row d-flex justify-content-center">
              {distFormulaStr}
            </h3>
          </div>
          <div className="form-group">
            <div className="input-group mb-3">
              <h3>Numero de Variables Aleatorias: </h3>

              <input
                type="number"
                min="100"
                max="999999"
                onChange={(e) => setBiN(e.target.value * 1)}
              />
            </div>

            <div className="input-group mb-3">
              <h3>
                Probabilidad de Exito(<small>En decimal</small>):{" "}
              </h3>

              <input
                type="number"
                min="100"
                max="999999"
                onChange={(e) => setBiProb(e.target.value * 1)}
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
              <th scope="col">Defectos</th>
            </tr>
          </thead>
          <tbody>
            {biDef.map((e, k) => {
              return (
                <tr scope="row" key={k}>
                  <td>{k + 1}</td>
                  <td>{e}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MetodoConvolucion;
