import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { BsArrowLeft } from "react-icons/bs";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight
} from "react-icons/hi";
import FalconCardHeader from "../../../components/common/FalconCardHeader";
const Historico = () => {
  const history = useHistory();

  const chamadas = [
    {
      numOrigem: "4002 - 8922",
      numDestino: "455 - 130 - 23",
      recLig: "rec",
      tempEspera: "1:00",
      duracaoChamada: "3:00",
      status: "Concluída"
    },
    {
      numOrigem: "4002 - 8922",
      numDestino: "455 - 130 - 23",
      recLig: "lig",
      tempEspera: "2:00",
      duracaoChamada: "0",
      status: "Não Atendida"
    },
    {
      numOrigem: "4002 - 8922",
      numDestino: "455 - 130 - 23",
      recLig: "lig",
      tempEspera: "12:00",
      duracaoChamada: "1:00",
      status: "Concluída"
    },
    {
      numOrigem: "4002 - 8922",
      numDestino: "455 - 130 - 23",
      recLig: "rec",
      tempEspera: "1:30",
      duracaoChamada: "0",
      status: "Perdida"
    },
    {
      numOrigem: "4002 - 8922",
      numDestino: "455 - 130 - 23",
      recLig: "rec",
      tempEspera: "1:50",
      duracaoChamada: "0",
      status: "Desistiu"
    }
  ];
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
        <div className="d-flex justify-content-between m-2">
          <h5 className="mb-2">Lista de chamadas</h5>
          <div className="d-flex">
            <select className="form-control" name="" id="">
              <option value="">5m</option>
              <option value="">50m</option>
              <option value="">1h</option>
              <option value="">2h</option>
              <option value="">3h</option>
            </select>
            <div className="btn btn-success">Atualizar</div>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Numero de Origem</th>
              <th scope="col">Numero de Destino</th>
              <th scope="col">Recebida/Ligada</th>
              <th scope="col">Tempo de Espera</th>
              <th scope="col">Duração chamada</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {chamadas.map(c => (
              <tr>
                <td>{c.numOrigem}</td>
                <td>{c.numDestino}</td>
                <td>
                  {c.recLig === "rec" ? (
                    <HiOutlineArrowNarrowLeft size={30} />
                  ) : (
                    <HiOutlineArrowNarrowRight size={30} />
                  )}{" "}
                </td>
                <td>{c.tempEspera}</td>
                <td>{c.duracaoChamada}</td>
                <td>{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export { Historico };
