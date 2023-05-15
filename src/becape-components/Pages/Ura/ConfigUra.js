import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import FalconCardHeader from "../../../components/common/FalconCardHeader";

const ConfigUra = () => {
  const history = useHistory();
  return (
    <Card>
      <FalconCardHeader title={`Configurações URA`} titleClass="text-falar">
        <button
          className="btn btn-outline-falar"
          onClick={() => history.goBack()}
        >
          <BsArrowLeft size={25} />
          Voltar
        </button>
      </FalconCardHeader>
      <CardBody>
        <div className="row">
          <div className="col-6 mb-4">
            <div>
              <label htmlFor="">Texto URA</label>
              <textarea type="text" className="form-control" />
            </div>
          </div>
          <div className="col-6 mb-4">
            <div>
              <label htmlFor="">Texto Erro</label>
              <textarea type="text" className="form-control" />
            </div>
          </div>

          <div className="col-4 mb-4">
            <div>
              <label htmlFor="">Audio/Texto</label>
              <select type="text" className="form-control">
                <option value="">Ligado</option>
                <option value="">Desligado</option>
              </select>
            </div>
          </div>

          <div className="col-4 mb-4">
            <div>
              <label htmlFor="">Audio/Texto Erro</label>
              <select type="text" className="form-control">
                <option value="">Desligado</option>
                <option value="">Ligado</option>
              </select>{" "}
            </div>
          </div>

          <div className="col-3">
            <div>
              <label htmlFor="">Máx. Espera Opção</label>
              <input class="form-control" type="number" />
            </div>
          </div>
          <div className="col-3">
            <div>
              <label htmlFor="">Máx. Tentativas</label>
              <input class="form-control" type="number" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export { ConfigUra };
