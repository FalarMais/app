import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { BsArrowLeft } from "react-icons/bs";

import FalconCardHeader from "../../../components/common/FalconCardHeader";
import { TabelaChamados } from "../../Components/TabelaChamados";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Historico = () => {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const contaId = Cookies.get("contaId");

  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const dataPost = {
          contaId
        };
        const response = await axios.get(
          `http://165.22.184.175/conta-data?contaId=${contaId}&datainicio=0001-01-01&datafim=0001-01-01`,
          dataPost
        );
        setResponse(response.data);
        setIsLoading(false);
      } catch (err) {
        if (err.response.data) {
          setResponse(err.response.data);
        }
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);
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
