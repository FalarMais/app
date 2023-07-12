import React, { useEffect, useState } from "react";

import CardSummary from "../../../components/dashboard/CardSummary";

import { useApiRequest } from "../../hooks/useApiRequest";
import Cookies from "js-cookie";

/*
import {
  calcularMinutosSegundos,
  setarHorarios,
  verificarDatas
} from "../../utils/setarHorarios";
*/
const Cards = ({ dataChamadas }) => {
  const contaId = Cookies.get("contaId");
  const [dados, setDados] = useState({
    totalRamais: 0,
    onlineRamais: "-",
    offlineRamais: "-",
    totalAtendedores: "-",
    totalUras: "-"
  });
  const { doRequest } = useApiRequest();

  useEffect(() => {
    (async () => {
      try {
        const [response, responseUra, responseAtendedores] = await Promise.all([
          doRequest("get", `/Conta/${contaId}/ramal`),
          doRequest("get", `/Conta/${contaId}/ura`),
          doRequest("get", `/Conta/${contaId}/atendedor`)
        ]);

        if (response.status === 200 || response.content) {
          const novosDados = {
            ...dados,
            totalRamais: response.content.length,
            totalAtendedores: responseAtendedores.content.length,
            totalUras: responseUra.content.length
          };
          setDados(novosDados);
        }
      } catch (error) {
        console.log("Caiu error ramal card");
      }
    })();
    //eslint-disable-next-line
  }, []);

  function verificarAtendidaPerdida(opcao) {
    if (!dataChamadas.content) {
      return 0;
    }
    if (dataChamadas.content.length === 0) {
      return 0;
    }

    const dataFiltrado = dataChamadas.content.filter(d => d.status === opcao);
    return dataFiltrado.length;
  }

  const verificarAtendimentoEspera = tipo => {
    if (!dataChamadas.content) {
      return 0;
    }
    let valor = dataChamadas.content.filter(
      chamada => chamada[tipo] === "" || chamada[tipo] === null
    ).length;

    return valor;
  };

  /* const calcularTempoMedioEspera = tipo => {
    var horaMenor,
      horaMaior = "";

    switch (tipo) {
      case "mediaEspera":
        horaMenor = "horaInicio";
        horaMaior = "horaAtendimento";
        break;
      case "mediaChamadas":
        horaMenor = "horaAtendimento";
        horaMaior = "horaFim";
        break;

      default:
        horaMaior = null;
        horaMenor = null;
    }

    if (!dataChamadas.content) {
      return 0;
    }

    const chamadasComTempoDeEspera = dataChamadas.content.map(chamada => {
      const existeCamposNulos = verificarDatas(
        chamada[horaMenor],
        chamada[horaMaior]
      );

      if (existeCamposNulos) {
        return 0;
      }
      const { atendimento, inicio } = setarHorarios(
        chamada[horaMenor],
        chamada[horaMaior]
      );

      const tempoDeEsperaEmMilissegundos = atendimento - inicio;

      if (tempoDeEsperaEmMilissegundos < 0) {
        console.log(`Id negativo`, chamada.id);
        console.log(
          `Negativo  Inicio = ${chamada.horaInicio}Hora Atendimento = | ${
            chamada.horaAtendimento
          } `
        );
      }

      return {
        ...chamada,
        tempoDeEsperaEmMilissegundos
      };
    });

    const filtrandoFalhas = chamadasComTempoDeEspera.filter(c => c !== 0);

    if (filtrandoFalhas.length > 0) {
      const somaDosTemposDeEsperaEmMilissegundos = filtrandoFalhas.reduce(
        (total, chamada) => total + chamada.tempoDeEsperaEmMilissegundos,
        0
      );
      const tempoMedioDeEsperaEmMilissegundos =
        somaDosTemposDeEsperaEmMilissegundos / filtrandoFalhas.length;

      const tempoFinal = calcularMinutosSegundos(
        tempoMedioDeEsperaEmMilissegundos
      );

      return tempoFinal;
    }
    return 0;
  }; */

  return (
    <>
      <div className="card-deck">
        <CardSummary rate="" title="" color="warning">
          <div className="d-flex flex-column">
            <h4>
              Chamadas: {dataChamadas.content ? dataChamadas.content.length : 0}
            </h4>
            <span className="text-success fs-1">
              Atendidas: {verificarAtendidaPerdida(2)}
            </span>
            <span className="text-danger fs-1">
              Perdidas: {verificarAtendidaPerdida(1)}
            </span>
          </div>
        </CardSummary>

        <CardSummary title="" color="info" rate="">
          <div className="d-flex flex-column">
            <h4>Numero de Ramais: {dados.totalRamais}</h4>
            <span className="text-muted fs-1">
              Online: {dados.onlineRamais}
            </span>
            <span className="text-muted fs-1">
              Offline: {dados.offlineRamais}
            </span>
          </div>
        </CardSummary>

        <CardSummary rate="" title="" color="warning">
          <div className="d-flex flex-column">
            <h4>
              T. médio de Espera: -
              {/* {calcularTempoMedioEspera("mediaEspera")} */}
            </h4>
            <span className="text-muted fs-1">
              T. médio das chamadas: -
              {/* {calcularTempoMedioEspera("mediaChamadas")} */}
            </span>
            <span className="text-muted fs-1">
              T médio das chamadas por hora: -
            </span>
          </div>
        </CardSummary>

        {/* <CardSummary content="43,594" rate="9.54%" title="Revenue" color="success" linkText="Statistics">
        <CountUp end={43594} duration={5} prefix="$" separator="," decimal="." />
      </CardSummary> */}
      </div>
      <div className="card-deck">
        <CardSummary rate="" title="" color="0">
          <h5>Em atedimento: {verificarAtendimentoEspera("horaFim")}</h5>
        </CardSummary>

        <CardSummary rate="" title="" color="">
          <h5>Atendedores: {dados.totalAtendedores}</h5>
          <h5>Uras: {dados.totalUras}</h5>
        </CardSummary>

        <CardSummary rate="" title="" color="">
          <h5>
            Ligações em espera: {verificarAtendimentoEspera("horaAtendimento")}
          </h5>
        </CardSummary>
      </div>
    </>
  );
};

export { Cards };
