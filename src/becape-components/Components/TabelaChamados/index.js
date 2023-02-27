import React, { useEffect } from 'react';

// import { useHistory } from 'react-router-dom';
// import { Card, CardBody } from 'reactstrap';
// import { BsArrowLeft } from 'react-icons/bs';
// import FalconCardHeader from '../../../components/common/FalconCardHeader';

// import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';
import './tabela.css';
import { useState } from 'react';

import { MdDelete } from 'react-icons/md';
import { FaPlay } from 'react-icons/fa';

const TabelaChamados = ({ tipo }) => {
  const [data, setData] = useState([]);

  const chamadas = [
    {
      codigo: '0001',
      operador: 'Michelle',
      ramal: '1002',
      situacao: 'RECEBIDAS',
      falando: '2194002-8922',
      tespera: '0:30',
      dchamada: '2:30'
    },
    {
      codigo: '0002',
      operador: 'Amanda',
      ramal: '1002',
      situacao: 'RECEBIDAS',
      falando: '2194002-8922',
      tespera: '0:30',
      dchamada: '2:30'
    },
    {
      codigo: '0003',
      operador: 'Rosana',
      ramal: '1002',
      situacao: 'RECEBIDAS',
      falando: '2194002-8922',
      tespera: '0:30',
      dchamada: '2:30'
    },
    {
      codigo: '0004',
      operador: 'Costa',
      ramal: '1002',
      situacao: 'RECEBIDAS',
      falando: '2194002-8922',
      tespera: '0:30',
      dchamada: '2:30'
    },
    {
      codigo: '0005',
      operador: 'Patricia',
      ramal: '1002',
      situacao: 'RECEBIDAS',
      falando: '2194002-8922',
      tespera: '0:30',
      dchamada: '2:30'
    },

    {
      codigo: '0005',
      operador: 'Patricia',
      ramal: '1002',
      situacao: 'EM PAUSA',
      falando: '2194002-8922',
      tespera: '0:30',
      dchamada: '2:30'
    },
    {
      codigo: '0005',
      operador: 'Patricia',
      ramal: '1002',
      situacao: 'EM PAUSA',
      falando: '2194002-8922',
      tespera: '0:30',
      dchamada: '2:30'
    },

    {
      codigo: '0005',
      operador: 'Patricia',
      ramal: '1002',
      situacao: 'CONCLUIDA',
      falando: '2194002-8922',
      tespera: '0:30',
      dchamada: '2:30'
    },
    {
      codigo: '0005',
      operador: 'Patricia',
      ramal: '1002',
      situacao: 'PERDIDA',
      falando: '2194002-8922',
      tespera: '0:30',
      dchamada: '2:30'
    },
    {
      codigo: '0005',
      operador: 'Patricia',
      ramal: '1002',
      situacao: 'PERDIDA',
      falando: '2194002-8922',
      tespera: '0:30',
      dchamada: '2:30'
    },
    {
      codigo: '0005',
      operador: 'Patricia',
      ramal: '1002',
      situacao: 'EM ATENDIMENTO',
      falando: '2194002-8922',
      tespera: '0:30',
      dchamada: '2:30'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      window
        .$('#example')
        .DataTable()
        .destroy();

      const novaData = tipo ? chamadas.filter(c => c.situacao === tipo) : chamadas;
      setData(novaData);
    }, 1000);
    // eslint-disable-next-line
  }, [tipo]);

  useEffect(() => {
    window.$('#example').DataTable({
      responsive: true,
      rowReorder: {
        selector: 'td:nth-child(2)'
      }
    });
  }, [data]);

  return (
    <table id="example" className="display" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Código</th>
          <th>Operador</th>
          <th>Ramal</th>
          <th>Situação</th>
          <th>Falando com</th>
          <th>T.Espera</th>
          <th>D.Chamada</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {data
          ? data.map((d, i) => (
              <tr key={i}>
                <td>{d.codigo}</td>
                <td>{d.operador}</td>
                <td>{d.ramal}</td>
                <td>{d.situacao}</td>
                <td>{d.falando}</td>
                <td>{d.tespera}</td>
                <td>{d.dchamada}</td>
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
            ))
          : null}
      </tbody>
    </table>
  );
};

export { TabelaChamados };
