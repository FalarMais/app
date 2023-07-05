import React from "react";
import { Agenda } from "./Agenda";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FalconCardHeader from "../../../components/common/FalconCardHeader";
import { BsArrowLeft } from "react-icons/bs";
import { Card, CardBody } from "reactstrap";
import { Numeros } from "./Numeros";

const AgendaNumeros = () => {
  const history = useHistory();
  return (
    <Card>
      <FalconCardHeader title={`Agenda / Horários`} titleClass="text-falar">
        <button
          className="btn btn-outline-falar"
          onClick={() => history.goBack()}
        >
          <BsArrowLeft size={25} />
          Voltar
        </button>
      </FalconCardHeader>
      <CardBody>
        <Agenda />
        <Numeros />
      </CardBody>
    </Card>
  );
};

export { AgendaNumeros };
