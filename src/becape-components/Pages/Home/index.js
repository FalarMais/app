import React, { useState } from "react";
import { Cards } from "./Cards";

import { TabelaChamados } from "../../Components/TabelaChamados";
import { Card } from "reactstrap";
import { useEffect } from "react";
import { useApiRequestEffect } from "../../hooks/useApiRequest";
import Cookies from "js-cookie";
import moment from "moment";
import { Grafico } from "./Grafico";

const hoje = moment().format("DD-MM-YYYY");
const Home = () => {
  const contaId = Cookies.get("contaId");
  const [datas, setDatas] = useState(hoje);
  const { response, setResponse, isLoading, refetch } = useApiRequestEffect(
    `chamada/periodo?contaid=${contaId}&dataInicial=${datas}`
  );

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
