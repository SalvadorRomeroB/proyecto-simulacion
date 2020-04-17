import React from "react";
import "./styles/App.scss";
import Header from "./components/header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AlgoritmoCuadradosMedios from "./components/algoritmos/algoritmoCuadradosMedios";
import AlgoritmoMultiplicadorConstante from "./components/algoritmos/algoritmoMultiplicadorConstante";
import AlgoritmoLineal from "./components/algoritmos/algoritmoLineal";
import AlgoritmoCongruencialMultiplicativo from "./components/algoritmos/algortimoCongruencialMultiplicativo";
import AlgoritmoCongruencialAditivo from "./components/algoritmos/algortimoCongruencialAditivo";
import AlgoritmoCongruencialCuadratico from "./components/algoritmos/algortimoCongruencialCuadratico";
import AlgoritmoProductosMedios from "./components/algoritmos/algoritmoProductosMedios";
import PruebaDstrbcnChiCdrd from "./components/pruebas/pruebaDistChiCuad";
import PruebaVarianza from "./components/pruebas/pruebaVarianza";
import PruebaUnidormidadChiCuadrada from "./components/pruebas/pruebaUniformidadChiCuadrada";
import PruebaHuecos from "./components/pruebas/pruebaHuecos";
import PruebaCorrArrAbMed from "./components/pruebas/pruebaIndCorrArrAbMed";
import PruebaIndepCorrArrAb from "./components/pruebas/pruebaIndepCorrArrAb";
import PruebaKolSmir from "./components/pruebas/pruebaKolSmir";
import PruebaMedias from "./components/pruebas/pruebaMedias";
import PruebaPoker from "./components/pruebas/pruebaPoker";
import PruebaSerie from "./components/pruebas/pruebaSeries";
import PruebaUniformidadKolSmir from "./components/pruebas/pruebaUniformidadKolSmir";
import MetodoConvolucion from "./components/metodos/metodoConvolucion";
import MetodoTransformadaInversa from "./components/metodos/metodoTransformadaInversa";

function App() {
  return (
    <Router>
      <Header />
      <div className="body">
        <Switch>
          <div className="container rest-body">
            <Route exact path="/algoritmo-cuadrados-medios">
              <AlgoritmoCuadradosMedios />
            </Route>
            <Route exact path="/algoritmo-productos-medios">
              <AlgoritmoProductosMedios />
            </Route>
            <Route exact path="/algoritmo-multiplicador-constante">
              <AlgoritmoMultiplicadorConstante />
            </Route>
            <Route exact path="/algoritmo-lineal">
              <AlgoritmoLineal />
            </Route>
            <Route exact path="/algoritmo-congruencial-multiplicativo">
              <AlgoritmoCongruencialMultiplicativo />
            </Route>
            <Route exact path="/algoritmo-congruencial-aditivo">
              <AlgoritmoCongruencialAditivo />
            </Route>
            <Route exact path="/algoritmo-congruencial-cuadratico">
              <AlgoritmoCongruencialCuadratico />
            </Route>
            <Route exact path="/pruebas-medias">
              <PruebaMedias />
            </Route>
            <Route exact path="/prueba-varianza">
              <PruebaVarianza />
            </Route>
            <Route exact path="/prueba-uniformidad-chi-cuadrada">
              <PruebaUnidormidadChiCuadrada />
            </Route>
            <Route exact path="/pruba-uniformidad-kolmogorov-smirnov">
              <PruebaUniformidadKolSmir />
            </Route>
            <Route exact path="/prueba-independencia-corridas-arriba-abajo">
              <PruebaIndepCorrArrAb />
            </Route>
            <Route
              exact
              path="/prueba-independencia-corridas-arriba-abajo-media"
            >
              <PruebaCorrArrAbMed />
            </Route>
            <Route exact path="/prueba-poker">
              <PruebaPoker />
            </Route>
            <Route exact path="/prueba-series">
              <PruebaSerie />
            </Route>
            <Route exact path="/prueba-huecos">
              <PruebaHuecos />
            </Route>
            <Route exact path="/pruba-distribucion-chi-cuadrada">
              <PruebaDstrbcnChiCdrd />
            </Route>
            <Route exact path="/prueba-kolmogorov-smirnov">
              <PruebaKolSmir />
            </Route>
            <Route exact path="/metodo-transformada-inversa">
              <MetodoTransformadaInversa />
            </Route>
            <Route exact path="/metodo-convolucion">
              <MetodoConvolucion />
            </Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
