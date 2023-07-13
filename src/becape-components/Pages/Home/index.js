import React, { useState } from "react";
import { Cards } from "./Cards";

import { TabelaChamados } from "../../Components/TabelaChamados";
import { Card } from "reactstrap";
import { useEffect } from "react";
import Cookies from "js-cookie";
import moment from "moment";
import { Grafico } from "./Grafico";
import axios from "axios";

const hoje = moment().format("YYYY-MM-DD");
const Home = () => {
  const contaId = Cookies.get("contaId");
  const context = Cookies.get("context");
  const [datas, setDatas] = useState(hoje);
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const { response, setResponse, isLoading, refetch } = useApiRequestEffect(
  //   `chamada/periodo?contaid=${contaId}&dataInicial=${datas}`
  // );

  const refetch = async () => {
    try {
      const dataPost = {
        contaId,
        datas
      };
      const response = await axios.get(
        `http://165.22.184.175/conta-data?contaId=${context}&datainicio=${moment(
          datas
        ).format("MM-DD-YYYY")}`,
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
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const momentt = moment().format("DD-MM-YYYY");

    console.log(
      momentt,
      moment()
        .subtract(1, "days")
        .format("DD-MM-YYYY")
    );
  }, []);

  const alterarData = event => {
    const dia = event.target.value;

    if (!dia) {
      setDatas(hoje);
    } else {
      const novaData = moment()
        .subtract(dia, "days")
        .format("DD-MM-YYYY");
      setDatas(novaData);
    }
  };

  const procurarChamadas = () => {
    refetch();
  };
  return (
    <div>
      <div className="bg-light px-2 py-1 my-2">
        <span className="pr-2">Filtrar Tempo:</span>
        <select
          name=""
          id=""
          className="mr-2"
          onChange={event => alterarData(event)}
        >
          <option value="">Hoje</option>
          <option value="1">Ontem</option>
          <option value="7">7 dias</option>
          <option value="30">30 dias</option>
        </select>
        <button className="btn btn-falar" onClick={() => procurarChamadas()}>
          Aplicar
        </button>
      </div>
      <Cards dataChamadas={response} />
      {/* <ModalChamada /> */}

      <Card className="my-3 p-3">
        <TabelaChamados
          dataChamadas={response}
          setDataChamadas={setResponse}
          isLoading={isLoading}
        />
      </Card>
      <Grafico response={response} />
    </div>
  );
};

export { Home };
