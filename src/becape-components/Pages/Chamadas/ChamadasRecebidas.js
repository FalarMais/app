import React from "react";

import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { BsArrowLeft } from "react-icons/bs";
import FalconCardHeader from "../../../components/common/FalconCardHeader";
import { TabelaChamados } from "../../Components/TabelaChamados";

const ChamadasRecebidas = () => {
  const history = useHistory();

  return (
    <Card>
      <FalconCardHeader title={`Chamadas Recebidas`}>
        <button
          className="btn btn-outline-primary"
          onClick={() => history.goBack()}
        >
          <BsArrowLeft size={25} />
          Voltar
        </button>
      </FalconCardHeader>
      <CardBody>
        <TabelaChamados />
      </CardBody>
    </Card>
  );
};

export { ChamadasRecebidas };
