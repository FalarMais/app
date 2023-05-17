import React, { useEffect } from "react";
import "./tabela.css";
import { useState } from "react";

import { MdDelete } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { api } from "../../services/api";

const TabelaChamados = ({ tipo, dataChamadas }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      window
        .$("#example")
        .DataTable()
        .destroy();

      const novaData = tipo
        ? dataChamadas.filter(c => c.situacao === tipo)
        : dataChamadas;
      console.log(novaData);
      setData(novaData);
    }, 1000);
    // eslint-disable-next-line
  }, [dataChamadas]);

  useEffect(() => {
    console.log("render");
    if (data.length > 0) {
      window.$("#example").DataTable({
        responsive: true,
        rowReorder: {
          selector: "td:nth-child(2)"
        },
        language: {
          url: "https://cdn.datatables.net/plug-ins/1.11.3/i18n/pt_br.json"
        }
      });
    }
  }, [data]);

  // function calcularDuracaoChamada(inicio, fim) {
  //   const minicio = moment(inicio, "YYYY-MM-DD HH:mm:ss");
  //   const mfim = moment(fim, "HH:mm:ss");

  //   const diffHoras = moment(mfim.diff(minicio)).format("HH");
  //   console.log(diffHoras);
  //   const diffMinutos = moment(mfim.diff(minicio)).format("mm");
  //   const diffSegundos = moment(mfim.diff(minicio)).format("ss");

  //   if (diffMinutos === "00") {
  //     return `${diffSegundos}s`;
  //   }
  //   return `${diffMinutos}m ${diffSegundos}s`;
  // }

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
    const { data } = await api.get(`/chamada/gravacaos/${idChamada}`);
    console.log(data[0].caminho);
  }
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
                      <MdDelete color="#EE565D" size={24} />
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
