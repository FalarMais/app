import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { CardsEspera } from '../FilaEspera/CardsEspera';

const FilaAtendimento = ({ tipo }) => {
  const [data, setData] = useState([]);

  const chamadas = [
    {
      codigo: '0001',
      situacao: 'RECEBIDA',
      para: '2194002-8922',
      tespera: '0:30'
    },
    {
      codigo: '0002',
      situacao: 'LIGADA',
      para: '2194002-8922',
      tespera: '0:30'
    },
    {
      codigo: '0001',
      situacao: 'RECEBIDA',
      para: '2194002-8922',
      tespera: '0:30'
    },
    {
      codigo: '0001',
      situacao: 'LIGADA',
      para: '2194002-8922',
      tespera: '0:30'
    },
    {
      codigo: '0001',
      situacao: 'RECEBIDA',
      para: '2194002-8922',
      tespera: '0:30'
    },

    {
      codigo: '0001',
      situacao: 'RECEBIDA',
      para: '2194002-8922',
      tespera: '0:30'
    },
    {
      codigo: '0001',
      situacao: 'RECEBIDA',
      para: '2194002-8922',
      tespera: '0:30'
    },

    {
      codigo: '0001',
      situacao: 'RECEBIDA',
      para: '2194002-8922',
      tespera: '0:30'
    },
    {
      codigo: '0001',
      situacao: 'RECEBIDA',
      para: '2194002-8922',
      tespera: '0:30'
    },
    {
      codigo: '0001',
      situacao: 'RECEBIDA',
      para: '2194002-8922',
      tespera: '0:30'
    },
    {
      codigo: '0001',
      situacao: 'RECEBIDA',
      para: '2194002-8922',
      tespera: '0:30'
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
    }, 2000);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.$('#example').DataTable();
    console.log(data);
  }, [data]);

  return (
    <div>
      <CardsEspera />
      <Card>
        <CardBody>
          <table id="example" className="display" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Código</th>
                <th>Situação</th>
                <th>para</th>
                <th>tespera</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data
                ? data.map((d, i) => (
                    <tr key={i}>
                      <td>{d.codigo}</td>
                      <td>{d.situacao}</td>
                      <td>{d.para}</td>
                      <td>{d.tespera}</td>
                      <td>
                        <div className="d-flex">
                          <button className="btn btn-outline-primary mr-2">
                            <span>Detalhes</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export { FilaAtendimento };
