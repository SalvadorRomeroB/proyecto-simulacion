import React, { useState } from "react";
import chiSquareInverse from "inv-chisquare-cdf";

const PruebaPoker = () => {
  const [nums, setNums] = useState([]);
  let [numbersCSVString, setNumbersCSVString] = useState("");
  let [testRun, setTestRun] = useState(false);
  let [disable, setDisable] = useState(true);
  let [fillAlpha, setFillAlpa] = useState(false);
  let [numlist, setnumList] = useState([]);

  const [categories, setCategories] = useState([
    { todoDif: 0 },
    { unPar: 0 },
    { dosPares: 0 },
    { unaTercia: 0 },
    { terciaPar: 0 },
    { poker: 0 },
    { quintilla: 0 },
  ]);
  const [ei, setEi] = useState([
    { todoDif: 0 },
    { unPar: 0 },
    { dosPares: 0 },
    { unaTercia: 0 },
    { terciaPar: 0 },
    { poker: 0 },
    { quintilla: 0 },
  ]);
  const [eiOi, setEiOi] = useState([
    { todoDif: 0 },
    { unPar: 0 },
    { dosPares: 0 },
    { unaTercia: 0 },
    { terciaPar: 0 },
    { poker: 0 },
    { quintilla: 0 },
    { total: 0 },
  ]);

  const [alpha, setAlpha] = useState(0);
  const [x20, setx20] = useState("");
  const [chi2, setChi2] = useState(0);

  const class5D = ["TD", "1P", "2P", "1T", "TP", "P", "Q"];
  const prob5D = [0.3024, 0.504, 0.108, 0.009, 0.072, 0.0045, 0.0001];

  const class3D = ["TD", "1P", "T"];
  const prob3D = [0.72, 0.27, 0.01];

  const class4D = ["TD", "1P", "2P", "1T", "P"];
  const prob4D = [0.504, 0.432, 0.027, 0.036, 0.001];

  const addCSVValues = () => {
    let numberList = numbersCSVString.split(",");
    setnumList(numberList);
    let noNewLine = numberList.map((x) => x.replace(/(\r\n|\n|\r)/gm, ""));
    console.log("original", noNewLine);
    var noDot = noNewLine.map((s) => s.substring(2));
    console.log("NO DOT", noDot);
    var sorted = noDot.map((x) => {
      let arr = x.split("");
      let sorted = arr.sort((a, b) => a - b);
      let joinArr = sorted.join("");

      return joinArr;
    });

    setNums(sorted);
    if (fillAlpha) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const handleClasifications = () => {
    let todoDif = 0;
    let unPar = 0;
    let dosPar = 0;
    let unaTercia = 0;
    let terciaPar = 0;
    let poker = 0;
    let quintilla = 0;
    console.log("size:", nums[0].length);

    if (nums[0].length === 5) {
      let arr = nums.map((str) => {
        let first = str.split(str[0]).length - 1;
        let second = str.split(str[1]).length - 1;
        let third = str.split(str[2]).length - 1;
        let fourth = str.split(str[3]).length - 1;
        let fifth = str.split(str[4]).length - 1;

        let all = [];
        all.push(first);
        all.push(second);
        all.push(third);
        all.push(fourth);
        all.push(fifth);
        console.log(all);
        console.log("STR:", str);

        if (all.includes(5)) {
          quintilla++;
        } else if (all.includes(3) && all.includes(2)) {
          terciaPar++;
        } else if (all.includes(2) && all.includes(1)) {
          let count = 0;
          for (let i = 0; i < all.length; i++) {
            if (all[i] === 2) {
              count++;
            }
          }
          if (count === 4) {
            console.log("2P");
            dosPar++;
          } else {
            unPar++;
            console.log("1P");
          }
        } else if (all.includes(4)) {
          console.log("Poker");
          poker++;
        } else if (all.includes(3) && all.includes(1)) {
          console.log("1T");
          unaTercia++;
        } else {
          console.log("TD");
          todoDif++;
        }
      });
      let tempCat = {
        todoDif: todoDif,
        unPar: unPar,
        dosPares: dosPar,
        unaTercia: unaTercia,
        terciaPar: terciaPar,
        poker: poker,
        quintilla: quintilla,
      };
      setCategories(tempCat);
      return tempCat;
    } else if (nums[0].length === 4) {
      let arr = nums.map((str) => {
        let first = str.split(str[0]).length - 1;
        let second = str.split(str[1]).length - 1;
        let third = str.split(str[2]).length - 1;
        let fourth = str.split(str[3]).length - 1;

        let all = [];
        all.push(first);
        all.push(second);
        all.push(third);
        all.push(fourth);
        console.log(all);

        if (all.includes(4)) {
          poker++;
        } else if (all.includes(3)) {
          unaTercia++;
        } else if (all.includes(2)) {
          let count = 0;
          for (let i = 0; i < all.length; i++) {
            if (all[i] === 2) {
              count++;
            }
          }
          if (count === 4) {
            console.log("2P");
            dosPar++;
          } else {
            unPar++;
            console.log("1P");
          }
        } else {
          console.log("TD");
          todoDif++;
        }
      });

      let tempCat = {
        todoDif: todoDif,
        unPar: unPar,
        dosPares: dosPar,
        unaTercia: unaTercia,
        poker: poker,
        terciaPar: 0,
        quintilla: 0,
      };

      setCategories(tempCat);
      return tempCat;
    } else if (nums[0].length === 3) {
      let arr = nums.map((str) => {
        let first = str.split(str[0]).length - 1;
        let second = str.split(str[1]).length - 1;
        let third = str.split(str[2]).length - 1;

        let all = [];
        all.push(first);
        all.push(second);
        all.push(third);
        console.log(all);

        if (all.includes(3)) {
          unaTercia++;
        } else if (all.includes(2)) {
          unPar++;
        } else {
          console.log("TD");
          todoDif++;
        }
      });

      let tempCat = {
        todoDif: todoDif,
        unPar: unPar,
        unaTercia: unaTercia,
        poker: poker,
        terciaPar: 0,
        quintilla: 0,
      };

      setCategories(tempCat);
      return tempCat;
    }
  };

  const solve5D = () => {
    let tempCat = handleClasifications();

    if (nums[0].length === 5) {
      let ei = prob5D.map((x) => parseFloat(x) * nums.length);
      setEi({
        todoDif: ei[0],
        unPar: ei[1],
        dosPares: ei[2],
        unaTercia: ei[3],
        terciaPar: ei[4],
        poker: ei[5],
        quintilla: ei[6],
      });
      let td = Math.pow(ei[0] - tempCat.todoDif, 2) / ei[0];
      let unP = Math.pow(ei[1] - tempCat.unPar, 2) / ei[1];
      let dosP = Math.pow(ei[2] - tempCat.dosPares, 2) / ei[2];
      let unT = Math.pow(ei[3] - tempCat.unaTercia, 2) / ei[3];
      let terciaP = Math.pow(ei[4] - tempCat.terciaPar, 2) / ei[4];
      let p = Math.pow(ei[5] - tempCat.poker, 2) / ei[5];
      let q = Math.pow(ei[6] - tempCat.quintilla, 2) / ei[6];
      let total = td + unP + dosP + unT + terciaP + p + q;
      setEiOi({
        todoDif: td,
        unPar: unP,
        dosPares: dosP,
        unaTercia: unT,
        terciaPar: terciaP,
        poker: p,
        quintilla: q,
        total: total,
      });

      setx20(total);
      let chisq = chiSquareInverse.invChiSquareCDF(1 - alpha, 6);
      setChi2(chisq);
    } else if (nums[0].length === 4) {
      let ei = prob4D.map((x) => parseFloat(x) * nums.length);
      console.log("ENTRA:", ei);
      setEi({
        todoDif: ei[0],
        unPar: ei[1],
        dosPares: ei[2],
        unaTercia: ei[3],
        terciaPar: 0,
        poker: ei[4],
        quintilla: 0,
      });
      let td = Math.pow(ei[0] - tempCat.todoDif, 2) / ei[0];
      let unP = Math.pow(ei[1] - tempCat.unPar, 2) / ei[1];
      let dosP = Math.pow(ei[2] - tempCat.dosPares, 2) / ei[2];
      let unT = Math.pow(ei[3] - tempCat.unaTercia, 2) / ei[3];
      let terciaP = 0;
      let p = Math.pow(ei[4] - tempCat.poker, 2) / ei[4];
      let q = 0;
      let total = td + unP + dosP + unT + terciaP + p + q;
      setEiOi({
        todoDif: td,
        unPar: unP,
        dosPares: dosP,
        unaTercia: unT,
        terciaPar: 0,
        poker: p,
        quintilla: 0,
        total: total,
      });
      console.log(total);
      setx20(total);
      let chisq = chiSquareInverse.invChiSquareCDF(1 - alpha, 6);
      setChi2(chisq);
      console.log(chisq);
    } else if (nums[0].length === 3) {
      let ei = prob3D.map((x) => parseFloat(x) * nums.length);
      setEi({
        todoDif: ei[0],
        unPar: ei[1],
        dosPares: 0,
        unaTercia: ei[2],
        terciaPar: 0,
        poker: 0,
        quintilla: 0,
      });
      let td = Math.pow(ei[0] - tempCat.todoDif, 2) / ei[0];
      let unP = Math.pow(ei[1] - tempCat.unPar, 2) / ei[1];
      let dosP = 0;
      let unT = Math.pow(ei[2] - tempCat.unaTercia, 2) / ei[2];
      let terciaP = 0;
      let p = 0;
      let q = 0;
      let total = td + unP + dosP + unT + terciaP + p + q;
      setEiOi({
        todoDif: td,
        unPar: unP,
        dosPares: 0,
        unaTercia: unT,
        terciaPar: 0,
        poker: 0,
        quintilla: 0,
        total: total,
      });

      setx20(total);
      let chisq = chiSquareInverse.invChiSquareCDF(1 - alpha, 6);
      setChi2(chisq);
    }
    setTestRun(true);
  };

  const handleConclusion = () => {
    if (chi2 < x20) {
      return (
        <div>
          <div className="card-header">Se rechaza la hipotesis</div>
          <div className="card-body">
            <h5 className="card-title">
              El estadístico X2o = {x20.toFixed(4)}, comparándolo con nuestro
              estadístico de tabla = {chi2.toFixed(4)}, entonces rechazamos que
              los números del conjunto sean independientes, con un nivel de
              confianza {(1 - alpha) * 100}%
            </h5>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="card-header">No se puede rechazar la hipotesis</div>
          <div className="card-body">
            <h5 className="card-title">
              El estadístico X2o = {x20.toFixed(4)}, comparándolo con nuestro
              estadístico de tabla = {chi2.toFixed(4)}, entonces NO rechazamos
              que los números del conjunto sean independientes, con un nivel de
              confianza {(1 - alpha) * 100}%
            </h5>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="row d-flex justify-content-center">
        <h1>Prueba de Poker</h1>
      </div>

      <small>
        <h7>Planteamiento de Hipotesis:</h7>
        <div className="col-12">
          <h7>H0</h7>
          <p>
            El estadístico X0^2 comparándolo con nuestro estadístico de tabla ,
            entonces no rechazamos que los números del conjunto sean
            independientes, con un nivel de confianza {(1 - alpha) * 100}%
          </p>
        </div>
        <div className="col-12">
          <h7>H1</h7>
          <p>
            El estadístico X0^2, comparándolo con nuestro estadístico de tabla,
            entonces rechazamos que los números del conjunto sean
            independientes, con un nivel de confianza {(1 - alpha) * 100}%
          </p>
        </div>
      </small>
      <label for="semilla">Alpha:</label>

      <div className="row poker">
        <input
          placeholder="Alpha"
          value={alpha}
          onChange={(e) => {
            setAlpha(e.target.value);
            setFillAlpa(true);
          }}
        />
      </div>
      <div className="row">
        <div>
          <p>
            {" "}
            Ingresa los numeros separados por comas y en formato "0.Num", no
            ".Num" :
          </p>

          <textarea
            id="csv"
            type="text"
            value={numbersCSVString}
            onChange={(e) => setNumbersCSVString(e.target.value)}
          />
        </div>
        <div className="col-6 d-flex flex-wrap inputs">
          {numlist.map((num) => {
            return <p className="number-list">{num}</p>;
          })}
        </div>
      </div>
      <div className="btn btn-primary" onClick={() => addCSVValues()}>
        Agregar Numeros
      </div>
      <button
        className="btn btn-primary"
        disabled={disable}
        onClick={() => solve5D()}
      >
        Correr Prueba
      </button>
      {testRun ? (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Categorias</th>
                <th scope="col">Oi</th>
                <th scope="col">Ei</th>
                <th scope="col"> (Ei-Oi)^2/Ei </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TD</td>
                <td>{categories.todoDif}</td>
                <td>{ei.todoDif.toFixed(4)}</td>
                <td>{eiOi.todoDif.toFixed(4)}</td>
              </tr>
              <tr>
                <td>1P</td>
                <td>{categories.unPar}</td>
                <td>{ei.unPar.toFixed(4)}</td>
                <td>{eiOi.unPar.toFixed(4)}</td>
              </tr>
              <tr>
                <td>2P</td>
                <td>{categories.dosPares}</td>
                <td>{ei.dosPares.toFixed(4)}</td>
                <td>{eiOi.dosPares.toFixed(4)}</td>
              </tr>
              <tr>
                <td>T</td>
                <td>{categories.unaTercia}</td>
                <td>{ei.unaTercia.toFixed(4)}</td>
                <td>{eiOi.unaTercia.toFixed(4)}</td>
              </tr>
              <tr>
                <td>TP</td>
                <td>{categories.terciaPar}</td>
                <td>{categories.terciaPar.toFixed(4)}</td>
                <td>{eiOi.terciaPar.toFixed(4)}</td>
              </tr>
              <tr>
                <td>P</td>
                <td>{categories.poker}</td>
                <td>{ei.poker.toFixed(4)}</td>
                <td>{eiOi.poker.toFixed(4)}</td>
              </tr>
              <tr>
                <td>Q</td>
                <td>{categories.quintilla}</td>
                <td>{ei.quintilla.toFixed(4)}</td>
                <td>{eiOi.quintilla.toFixed(4)}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td></td>
                <td></td>
                <td>{eiOi.total.toFixed(4)}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>CHISQRINV </td>
                <td>{chi2.toFixed(4)}</td>
              </tr>
            </tbody>
          </table>
          {handleConclusion()}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PruebaPoker;
