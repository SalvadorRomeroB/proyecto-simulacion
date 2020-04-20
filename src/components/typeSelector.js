import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "./header";

const TypeSelector = () => {
  return (
    <div>
      <div className="row drop">
        <div className="col-3" />
        <div className="col-2 first ">
          <Dropdown>
            <Dropdown.Toggle>Algoritmos</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link
                  className="dropdown-link"
                  to="/algoritmo-cuadrados-medios"
                >
                  Algoritmo Cuadrados Medios
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  className="dropdown-link"
                  to="/algoritmo-productos-medios"
                >
                  Algoritmo Productos Medios
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  className="dropdown-link"
                  to="/algoritmo-multiplicador-constante"
                >
                  Algoritmo Multiplicador Constante
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link className="dropdown-link" to="/algoritmo-lineal">
                  Algoritmo Lineal
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  className="dropdown-link"
                  to="/algoritmo-congruencial-multiplicativo"
                >
                  Algoritmo Congruencial Multiplicativo
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  className="dropdown-link"
                  to="/algoritmo-congruencial-aditivo"
                >
                  Algoritmo Congruencial Aditivo
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  className="dropdown-link"
                  to="/algoritmo-congruencial-cuadratico"
                >
                  Algoritmo Congruencial Cuadrático
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col-2">
          <Dropdown>
            <Dropdown.Toggle>Pruebas</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link className="dropdown-link" to="/pruebas-medias">
                  Prueba de Medias
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link className="dropdown-link" to="/prueba-varianza">
                  Prueba de Varianza
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  className="dropdown-link"
                  to="/prueba-uniformidad-chi-cuadrada"
                >
                  Prueba Uniformidad Chi-Cuadrada
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  className="dropdown-link"
                  to="/pruba-uniformidad-kolmogorov-smirnov"
                >
                  Prueba Uniformidad Kolmogorov-Smirnov
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  className="dropdown-link"
                  to="/prueba-independencia-corridas-arriba-abajo"
                >
                  Prueba Independencia Corridas Arriba y Abajo
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  className="dropdown-link"
                  to="/prueba-independencia-corridas-arriba-abajo-media"
                >
                  Prueba Independencia Corridas Arriba y Abajo Media
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link className="dropdown-link" to="/prueba-poker">
                  Prueba Póker
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link className="dropdown-link" to="/prueba-series">
                  Prueba Series
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link className="dropdown-link" to="/prueba-huecos">
                  Prueba Huecos
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  className="dropdown-link"
                  to="/pruba-distribucion-chi-cuadrada"
                >
                  Prueba Distribución Chi Chuadrada
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link className="dropdown-link" to="/prueba-kolmogorov-smirnov">
                  Prueba Kolmogorov-Smirnov
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col-2">
          <Dropdown>
            <Dropdown.Toggle>Metodos</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link
                  className="dropdown-link"
                  to="/metodo-transformada-inversa"
                >
                  Método Transformada Inversa
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link className="dropdown-link" to="/metodo-convolucion">
                  Método Convolución
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col-3" />
      </div>
    </div>
  );
};

export default TypeSelector;
