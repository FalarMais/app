import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";

import FalconCardHeader from "../../../components/common/FalconCardHeader";
import { TabelaChamados } from "../../Components/TabelaChamados";

import { AiOutlineClear } from "react-icons/ai";

const Historico = () => {
  const hoje = moment().format("YYYY-MM-DD");

  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    dataInicial: "",
    dataFinal: "",
    tamanhopagina: 100,
    numero: ""
  });
  const context = Cookies.get("context");
  const history = useHistory();

  const refetch = async () => {
    try {
      const dataMaisUm = moment(filtros.dataFinal)
        .add("d", 1)
        .format("YYYY-MM-DD");

      setIsLoading(true);
      let endpoint = `http://165.22.184.175/conta-data/numero?contaId=${context}&numero=${
        filtros.numero
      }&tamanhopagina=${filtros.tamanhopagina}`;

      console.log(filtros.dataFinal);

      if (filtros.dataFinal !== "") {
        endpoint += `&dataInicial=${filtros.dataInicial}`;
      }
      if (filtros.dataFinal !== "") {
        endpoint += `&dataFinal=${dataMaisUm}`;
      }
      const response = await axios.get(endpoint);
      setResponse(response.data);
      setIsLoading(false);
    } catch (err) {
      if (err.response.data) {
        setResponse(err.response.data);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line
  }, []);

  const handleFiltro = event => {
    const { name, value } = event.target;
    setFiltros({ ...filtros, [name]: value });
  };
  return (
    <Card>
      <FalconCardHeader title={`Histórico`} titleClass="text-falar">
        <button
          className="btn btn-outline-primary"
          onClick={() => history.goBack()}
        >
          <BsArrowLeft size={25} />
          Voltar
        </button>
      </FalconCardHeader>
      <CardBody>
        <div className="row my-4">
          <div className="col-4">
            <div className="d-flex flex-column">
              <label htmlFor="">
                Data inicial:{" "}
                <AiOutlineClear
                  size={20}
                  color="#6F00B4"
                  onClick={() => setFiltros({ ...filtros, dataInicial: "" })}
                />
              </label>
              <input
                type="date"
                className="form-control"
                value={filtros.dataInicial}
                name="dataInicial"
                onChange={handleFiltro}
              />
            </div>
          </div>

          <div className="col-4 mb-4">
            <div className="d-flex flex-column">
              <label htmlFor="">
                Data final:{" "}
                <AiOutlineClear
                  size={20}
                  color="#6F00B4"
                  onClick={() => setFiltros({ ...filtros, dataFinal: "" })}
                />
              </label>
              <input
                type="date"
                className="form-control"
                value={filtros.dataFinal}
                name="dataFinal"
                onChange={handleFiltro}
              />
            </div>
          </div>

          <div className="col-4 mb-4">
            <div className="d-flex flex-column">
              <label htmlFor="">Quantidade:</label>
              <input
                type="number"
                className="form-control"
                value={filtros.tamanhopagina}
                name="tamanhopagina"
                onChange={handleFiltro}
              />
            </div>
          </div>

          <div className="col-3 mb-4">
            <div className="d-flex flex-column">
              <label htmlFor="">Número:</label>
              <input
                type="number"
                className="form-control"
                value={filtros.numero}
                name="numero"
                onChange={handleFiltro}
              />
            </div>
          </div>

          <div className="col-2 d-flex align-items-center">
            <button
              className="btn btn-falar"
              onClick={() => refetch()}
              disabled={isLoading ? true : false}
            >
              {isLoading ? (
                <div class="spinner-border text-light" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                "Procurar"
              )}
            </button>
          </div>
        </div>
        <TabelaChamados
          dataChamadas={response}
          setDataChamadas={setResponse}
          isLoading={isLoading}
        />
      </CardBody>
    </Card>
  );
};

export { Historico };
