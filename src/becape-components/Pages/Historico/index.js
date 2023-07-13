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
import moment from "moment";
const Historico = () => {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const context = Cookies.get("context");

  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://165.22.184.175/conta-data?contaId=${context}&datainicio=${moment().format(
            "MM-DD-YYYY"
          )}`
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
