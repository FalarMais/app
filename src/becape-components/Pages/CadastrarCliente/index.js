import React from "react";
import { Card, CardBody } from "reactstrap";
import { BsArrowLeft } from "react-icons/bs";

import FalconCardHeader from "../../../components/common/FalconCardHeader";
import { useHistory } from "react-router-dom";
import { FormCadastrarCliente } from "../../Components/CadastrarCliente";

const NovoCadastro = () => {
  const history = useHistory();
  return (
    <Card>
      <FalconCardHeader title={`Novo Cadastro`}>
        <button
          className="btn btn-outline-primary"
          onClick={() => history.goBack()}
        >
          <BsArrowLeft size={25} />
          Voltar
        </button>
      </FalconCardHeader>
      <CardBody>
        <FormCadastrarCliente />
      </CardBody>
    </Card>
  );
};

export { NovoCadastro };
