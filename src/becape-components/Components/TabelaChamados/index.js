import React, { useEffect } from "react";

// import { useHistory } from 'react-router-dom';
// import { Card, CardBody } from 'reactstrap';
// import { BsArrowLeft } from 'react-icons/bs';
// import FalconCardHeader from '../../../components/common/FalconCardHeader';

// import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';
import "./tabela.css";
import { useState } from "react";

import { MdDelete } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import moment from "moment";

const TabelaChamados = ({ tipo }) => {
  const [data, setData] = useState([]);

  const chamadas = [
    {
      origemChamada: "21966272062",
      destinoChamada: "80843032",
      horaInicio: "2020-03-04T13:30:00",
      horaFim: "2020-03-04T13:30:20",
      horaAtendimento: "2194002-8922",
      status: 1,
      contaId: "313213asd-32132132dad-32321das-dsa213"
    },
    {
      origemChamada: "21966272062",
      destinoChamada: "80843032",
      horaInicio: "2020-03-04T13:00:00",
      horaFim: "2020-03-04T13:30:10",
      horaAtendimento: "2194002-8922",
      status: 1,
      contaId: "313213asd-32132132dad-32321das-dsa213"
    },
    {
      origemChamada: "21966272062",
      destinoChamada: "80843032",
      horaInicio: "2020-03-04T13:00:00",
      horaFim: "2020-03-04T13:30:20",
      horaAtendimento: "2194002-8922",
      status: 1,
      contaId: "313213asd-32132132dad-32321das-dsa213"
    },
    {
      origemChamada: "21966272062",
      destinoChamada: "80843032",
      horaInicio: "2020-03-04T13:00:00",
      horaFim: "2020-03-04T13:30:40",
      horaAtendimento: "2194002-8922",
      status: 1,
      contaId: "313213asd-32132132dad-32321das-dsa213"
    },
    {
      origemChamada: "21966272062",
      destinoChamada: "80843032",
      horaInicio: "2020-03-04T13:00:00",
      horaFim: "2020-03-04T13:30:50",
      horaAtendimento: "2194002-8922",
      status: 1,
      contaId: "313213asd-32132132dad-32321das-dsa213"
    },

    {
      origemChamada: "21966272062",
      destinoChamada: "80843032",
      horaInicio: "2020-03-04T13:00:00",
      horaFim: "2020-03-04T13:30:33",
      horaAtendimento: "2194002-8922",
      status: 1,
      contaId: "313213asd-32132132dad-32321das-dsa213"
    },
    {
      origemChamada: "21966272062",
      destinoChamada: "80843032",
      horaInicio: "2020-03-04T13:00:00",
      horaFim: "2020-03-04T13:30:00",
      horaAtendimento: "2194002-8922",
      status: 1,
      contaId: "313213asd-32132132dad-32321das-dsa213"
    },

    {
      origemChamada: "21966272062",
      destinoChamada: "80843032",
      horaInicio: "2020-03-04T13:00:00",
      horaFim: "2020-03-04T13:30:00",
      horaAtendimento: "2194002-8922",
      status: 1,
      contaId: "313213asd-32132132dad-32321das-dsa213"
    },
    {
      origemChamada: "21966272062",
      destinoChamada: "80843032",
      horaInicio: "2020-03-04T13:00:00",
      horaFim: "2020-03-04T13:30:00",
      horaAtendimento: "2194002-8922",
      status: 1,
      contaId: "313213asd-32132132dad-32321das-dsa213"
    },
    {
      origemChamada: "21966272062",
      destinoChamada: "80843032",
      horaInicio: "2020-03-04T13:00:00",
      horaFim: "2020-03-04T13:30:00",
      horaAtendimento: "2194002-8922",
      status: 1,
      contaId: "313213asd-32132132dad-32321das-dsa213"
    },
    {
      origemChamada: "21966272062",
      destinoChamada: "80843032",
      horaInicio: "2020-03-04T13:00:00",
      horaFim: "2020-03-04T13:30:00",
      horaAtendimento: "2194002-8922",
      status: 1,
      contaId: "313213asd-32132132dad-32321das-dsa213"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      window
        .$("#example")
        .DataTable()
        .destroy();

      const novaData = tipo
        ? chamadas.filter(c => c.situacao === tipo)
        : chamadas;
      setData(novaData);
    }, 1000);
    // eslint-disable-next-line
  }, [tipo]);

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

  function calcularDuracaoChamada(inicio, fim) {
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
                <td>{d.status}</td>
                <td>{moment(d.horaInicio).format("DD/MM HH:mm:ss")}</td>
                <td>{moment(d.horaFim).format("DD/MM HH:mm:ss")}</td>
                <td>{calcularDuracaoChamada(d.horaInicio, d.horaFim)}</td>
                <td>
                  <div className="d-flex">
                    <button className="btn mr-2">
                      <FaPlay color="#2cb72c" size={20} />
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
