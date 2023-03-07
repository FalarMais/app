import React from "react";
import { MdCall } from "react-icons/md";
import { TabelaChamados } from "../../Components/TabelaChamados";
import { Historico } from "../Historico";

const Operador = () => {
  return (
    <div className="row">
      <div className="col-12 col-md-9">
        <div className="bg-light rounded p-3">
          <div className="d-flex align-items-center justify-content-between">
            <h3>Ana Pereira da Costa</h3>
            <h4>CPF: 168.555.807-00</h4>
          </div>

          <div className="d-flex align-items-center justify-content-between mb-5">
            <div>
              <span className="mr-2">42 anos</span>
              <span>Telefone: 4002-8922</span>
            </div>
            <span>Endereço: Estrada velha N° 42</span>
          </div>

          <div>
            <h5 className="mb-3">Produtos Recomendados</h5>
            <div className="row">
              <div className="col-3">
                <div className="d-flex flex-column">
                  <img
                    width="100"
                    src="https://imgs.ponto.com.br/1523906528/1xg.jpg"
                    alt=""
                  />
                  <span>Loratamed</span>
                  <span>R$ 3,90</span>
                </div>
              </div>

              <div className="col-3">
                <div className="d-flex flex-column">
                  <img
                    width="100"
                    src="https://imgs.ponto.com.br/1523906528/1xg.jpg"
                    alt=""
                  />
                  <span>Loratamed</span>
                  <span>R$ 3,90</span>
                </div>
              </div>

              <div className="col-3">
                <div className="d-flex flex-column">
                  <img
                    width="100"
                    src="https://imgs.ponto.com.br/1523906528/1xg.jpg"
                    alt=""
                  />
                  <span>Loratamed</span>
                  <span>R$ 3,90</span>
                </div>
              </div>

              <div className="col-3">
                <div className="d-flex flex-column">
                  <img
                    width="100"
                    src="https://imgs.ponto.com.br/1523906528/1xg.jpg"
                    alt=""
                  />
                  <span>Loratamed</span>
                  <span>R$ 3,90</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Historico />
      </div>
      <div className="col-12 col-md-3">
        <div className="p-3 bg-light rounded d-flex flex-column">
          <h5 className="mb-3">Chamadas em fila - 5</h5>

          <div className="d-flex align-items-center">
            <input type="checkbox" name="" id="" />
            <label class="p-0 m-0 mx-1" htmlFor="">
              Atender Automaticamente
            </label>
          </div>

          <div>
            <div
              className="p-2 px-4 my-3 rounded position-relative"
              style={{ backgroundColor: "#edf2f9" }}
            >
              <div className="d-flex mb-2 align-items-center justify-content-between">
                <span>Ana</span>
                <span>16:00/00:35</span>
              </div>
              <span className="d-block text-right">(21)9876-9876</span>
              <div className="position-absolute" style={{ left: -10, top: 25 }}>
                <button
                  className="bg-success d-flex justify-content-center align-items-center"
                  style={{ width: 35, height: 35, borderRadius: 17.5, border: 0 }}
                >
                  <MdCall size={20} color="#fff" />
                </button>
              </div>
            </div>

            <div
              className="p-2 px-4 my-3 rounded position-relative"
              style={{ backgroundColor: "#edf2f9" }}
            >
              <div className="d-flex mb-2 align-items-center justify-content-between">
                <span>Ana</span>
                <span>16:00/00:35</span>
              </div>
              <span className="d-block text-right">(21)9876-9876</span>
              <div className="position-absolute" style={{ left: -10, top: 25 }}>
                <button
                  className="bg-success d-flex justify-content-center align-items-center"
                  style={{ width: 35, height: 35, borderRadius: 17.5, border: 0 }}
                >
                  <MdCall size={20} color="#fff" />
                </button>
              </div>
            </div>

            <div
              className="p-2 px-4 my-3 rounded position-relative"
              style={{ backgroundColor: "#edf2f9" }}
            >
              <div className="d-flex mb-2 align-items-center justify-content-between">
                <span>Ana</span>
                <span>16:00/00:35</span>
              </div>
              <span className="d-block text-right">(21)9876-9876</span>
              <div className="position-absolute" style={{ left: -10, top: 25 }}>
                <button
                  className="bg-success d-flex justify-content-center align-items-center"
                  style={{ width: 35, height: 35, borderRadius: 17.5, border: 0 }}
                >
                  <MdCall size={20} color="#fff" />
                </button>
              </div>
            </div>

            <div
              className="p-2 px-4 my-3 rounded position-relative"
              style={{ backgroundColor: "#edf2f9" }}
            >
              <div className="d-flex mb-2 align-items-center justify-content-between">
                <span>Ana</span>
                <span>16:00/00:35</span>
              </div>
              <span className="d-block text-right">(21)9876-9876</span>
              <div className="position-absolute" style={{ left: -10, top: 25 }}>
                <button
                  className="bg-success d-flex justify-content-center align-items-center"
                  style={{ width: 35, height: 35, borderRadius: 17.5, border: 0 }}
                >
                  <MdCall size={20} color="#fff" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Operador };
