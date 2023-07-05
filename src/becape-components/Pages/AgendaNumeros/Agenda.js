import React, { Fragment, useEffect, useState } from "react";
import { useApiRequest, useApiRequestEffect } from "../../hooks/useApiRequest";
import { useInicializarTabela } from "../../hooks/useInicializarTabela";
import Cookies from "js-cookie";
import { FormAgenda } from "../../Components/FormAgenda";

const diasDaSemana = [
  { dia: "Domingo", valor: 1 },
  { dia: "Segunda", valor: 2 },
  { dia: "Terça", valor: 3 },
  { dia: "Quarta", valor: 4 },
  { dia: "Quinta", valor: 5 },
  { dia: "Sexta", valor: 6 },
  { dia: "Sábado", valor: 7 }
];

const meses = [
  { mes: "Janeiro", valor: 1 },
  { mes: "Fevereiro", valor: 2 },
  { mes: "Março", valor: 3 },
  { mes: "Abril", valor: 4 },
  { mes: "Maio", valor: 5 },
  { mes: "Junho", valor: 6 },
  { mes: "Julho", valor: 7 },
  { mes: "Agosto", valor: 8 },
  { mes: "Setembro", valor: 9 },
  { mes: "Outubro", valor: 10 },
  { mes: "Novembro", valor: 11 },
  { mes: "Dezembro", valor: 12 }
];

const Agenda = () => {
  const [addAgenda, setAddAgenda] = useState(false);
  const [agenda, setAgenda] = useState(false);
  const [data, setData] = useState([]);
  const [atendedores, setAtendedores] = useState([]);
  const { doRequest } = useApiRequest();
  const contaId = Cookies.get("contaId");
  const { response, setResponse, refetch, isLoading } = useApiRequestEffect(
    `/Conta/${contaId}/agenda`
  );

  useInicializarTabela(data, "example2");

  // const { doRequest } = useApiRequest();

  useEffect(() => {
    if (!isLoading && (!response.content || response.content.length === 0)) {
      const vazio = {
        id: 123,
        diaSemana: "-",
        horaInicio: "-",
        horaFim: "-",
        diaMes: "-",
        mes: "-",
        prioridade: "-"
      };
      setData([vazio]);
    }
  }, [isLoading, response.content]);

  useEffect(() => {
    window
      .$("#example2")
      .DataTable()
      .destroy();

    if (response.content) {
      setData(response.content);
    }

    if (agenda) {
      let cl = JSON.parse(sessionStorage.getItem("formAgenda"));
      setAgenda(false);

      setTimeout(() => {
        setAgenda(cl);
      }, 100);
    }
    // eslint-disable-next-line
  }, [response]);

  const editarAgenda = d => {
    setAgenda(agenda.id === d.id ? false : d);
  };

  const excluirAgenda = async (e, id) => {
    e.stopPropagation();
    setAgenda(false);
    const verificarSolicitacao = window.confirm(
      `Deseja excluir a agenda ${id}?`
    );

    if (verificarSolicitacao) {
      try {
        await doRequest("delete", `/Agenda/${id}`);
        const contentFiltrado = data.filter(a => a.id !== id);
        setResponse({ content: contentFiltrado });
      } catch (err) {}
    }
  };

  useEffect(() => {
    (async () => {
      const response = await doRequest("get", `/Conta/${contaId}/atendedor`);
      if (response.content) {
        setAtendedores(response.content);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const verificarMes = mesRecebido => {
    const procurar = meses.filter(mes => mesRecebido === mes.valor).shift();
    return procurar.mes;
  };

  const verificarDiaSemana = diasDaSemanaRecebido => {
    const procurar = diasDaSemana
      .filter(dias => diasDaSemanaRecebido === dias.valor)
      .shift();
    return procurar.dia;
  };
  return (
    <Fragment>
      <div className="mb-4 d-flex justify-content-between">
        <h5 className="mb-2">Lista de Agendas</h5>
        <div className="btn btn-falar" onClick={() => setAddAgenda(!addAgenda)}>
          {" "}
          Adicionar Agenda
        </div>
      </div>
      {addAgenda === true ? (
        <div className="mb-3">
          <FormAgenda
            tipo="add"
            refetch={refetch}
            atendedores={atendedores}
            diasDaSemana={diasDaSemana}
            meses={meses}
          />
        </div>
      ) : null}

      <div style={{ minHeight: 300 }}>
        {data.length > 0 ? (
          <div>
            <table id="example2" className="display" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Mês</th>
                  <th>Dia</th>
                  <th>Dia Semana</th>
                  <th>Hora Inicio</th>
                  <th>Hora fim</th>
                  <th>Prioridade</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i} onClick={() => editarAgenda(d)}>
                    <td>{verificarMes(d.mes)}</td>
                    <td>{verificarDiaSemana(d.diaSemana)}</td>
                    <td>{d.diaMes}</td>
                    <td>{d.horaInicio}</td>
                    <td>{d.horaFim}</td>
                    <td>{d.prioridade}</td>
                    <td>
                      <div
                        onClick={e => excluirAgenda(e, d.id)}
                        style={{
                          backgroundColor: d.status ? "green" : "red",
                          width: 20,
                          height: 20,
                          borderRadius: 10
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {agenda ? (
              <div className="my-4">
                <FormAgenda
                  diasDaSemana={diasDaSemana}
                  meses={meses}
                  tipo="atualizar"
                  data={agenda}
                  refetch={refetch}
                  atendedores={atendedores}
                />
              </div>
            ) : null}
          </div>
        ) : (
          <h1>CARREGANDO</h1>
        )}
      </div>
    </Fragment>
  );
};

export { Agenda };
