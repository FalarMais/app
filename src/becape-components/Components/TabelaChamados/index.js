import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaPlay } from "react-icons/fa";

import { api } from "../../services/api";
import { useInicializarTabela } from "../../hooks/useInicializarTabela";

import "./tabela.css";
import { useApiRequest } from "../../hooks/useApiRequest";

const TabelaChamados = ({ tipo, dataChamadas, setDataChamadas }) => {
  const [data, setData] = useState([]);
  useInicializarTabela(data);
  const { doRequest } = useApiRequest();
  useEffect(() => {
    window
      .$("#example")
      .DataTable()
      .destroy();

    if (dataChamadas.content) {
      setData(dataChamadas.content);
    } else {
      setData([]);
    }
    // eslint-disable-next-line
  }, [dataChamadas]);

  /* function calcularDuracaoChamada(inicio, fim) {
       const minicio = moment(inicio, "YYYY-MM-DD HH:mm:ss");
       const mfim = moment(fim, "HH:mm:ss");

       const diffHoras = moment(mfim.diff(minicio)).format("HH");
       console.log(diffHoras);
       const diffMinutos = moment(mfim.diff(minicio)).format("mm");
       const diffSegundos = moment(mfim.diff(minicio)).format("ss");

       if (diffMinutos === "00") {
         return `${diffSegundos}s`;
       }
       return `${diffMinutos}m ${diffSegundos}s`;
       }*/

  function verificarStatus(status) {
    switch (status) {
      case 1:
        return "PERDIDA";
      case 2:
        return "ATENDIDA";
      default:
        return "";
    }
  }

  async function abrirGravacao(idChamada) {
    const { content } = await doRequest(
      "get",
      `/chamada/${idChamada}/gravacoes`
    );
    console.log(content);
  }

  const excluirChamada = async id => {
    const verificarSolicitacao = window.confirm(
      `Deseja excluir a chamada ${id}?`
    );

    if (verificarSolicitacao) {
      try {
        await api.delete(`/chamada/${id}`);
        const contentFiltrado = dataChamadas.content.filter(a => a.id !== id);

        setDataChamadas({ ...dataChamadas, content: contentFiltrado });
      } catch (err) {}
    }
  };
  return (
    <div style={{ minHeight: 500 }}>
      {data.length > 0 ? (
        <table id="example" className="display" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Origem</th>
              <th>Destino</th>
              <th>Situação</th>
              <th>H.Ínicio</th>
              <th>H.Fim</th>
              <th>D.Chamada</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{d.origemChamada}</td>
                <td>{d.destinoChamada}</td>
                <td>{verificarStatus(d.status)}</td>
                <td>{d.horaInicio}</td>
                <td>{d.horaFim}</td>
                <td>
                  {/* {calcularDuracaoChamada(d.horaInicio, d.horaFim)} */}
                </td>
                <td>
                  <div className="d-flex">
                    <button className="btn mr-2">
                      <FaPlay
                        color="#2cb72c"
                        size={20}
                        onClick={() => abrirGravacao(d.id)}
                      />
                    </button>
                    <button className="btn">
                      <MdDelete
                        color="#EE565D"
                        size={24}
                        onClick={() => excluirChamada(d.id)}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>CARREGANDO</h1>
      )}
    </div>
  );
};

export { TabelaChamados };
