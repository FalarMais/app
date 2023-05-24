import React from "react";

import CardSummary from "../../../components/dashboard/CardSummary";

const Cards = ({ dataChamadas }) => {
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
            <h4>Numero de Ramais: 35</h4>
            <span className="text-muted fs-1">Online: 30</span>
            <span className="text-muted fs-1">Offline: 35</span>
          </div>
        </CardSummary>

        <CardSummary rate="" title="" color="warning">
          <div className="d-flex flex-column">
            <h4>T. médio de Espera: 2:00</h4>
            <span className="text-muted fs-1">T. médio das chamadas: 3:00</span>
            <span className="text-muted fs-1">
              T médio das chamadas por hora: 4:00
            </span>
          </div>
        </CardSummary>

        {/* <CardSummary content="43,594" rate="9.54%" title="Revenue" color="success" linkText="Statistics">
        <CountUp end={43594} duration={5} prefix="$" separator="," decimal="." />
      </CardSummary> */}
      </div>
      <div className="card-deck">
        <CardSummary rate="" title="" color="0">
          <h5>Em atedimento: 4</h5>
        </CardSummary>

        <CardSummary rate="" title="" color="">
          <h5>Operadores: 4</h5>
        </CardSummary>

        <CardSummary rate="" title="" color="">
          <h5>Ligações em espera: 2</h5>
        </CardSummary>
      </div>
    </>
  );
};

export { Cards };
