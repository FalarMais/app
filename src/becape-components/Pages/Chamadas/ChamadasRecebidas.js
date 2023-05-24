import React from "react";

import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { BsArrowLeft } from "react-icons/bs";
import FalconCardHeader from "../../../components/common/FalconCardHeader";
import { TabelaChamados } from "../../Components/TabelaChamados";
import Cookies from "js-cookie";
import { useApiRequestEffect } from "../../hooks/useApiRequest";

const contaId = Cookies.get("contaId");
const ChamadasRecebidas = () => {
  const history = useHistory();
  const { response, setResponse } = useApiRequestEffect(
    `/chamada/conta/${contaId}`
  );
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
        <TabelaChamados dataChamadas={response} setDataChamadas={setResponse} />
      </CardBody>
    </Card>
  );
};

export { ChamadasRecebidas };
