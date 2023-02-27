import React from 'react';
// import PaymentsLineChart from '../../../components/dashboard/PaymentsLineChart';
import { Cards } from './Cards';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { ModalChamada } from '../../Components/ModalChamada/ModalChamada';
import { TabelaChamados } from '../../Components/TabelaChamados';
import { Card } from 'reactstrap';
const Home = () => {
  const data = [
    {
      name: 'Dia 1',
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: 'Dia 2',
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: 'Dia 3',
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: 'Dia 4',
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: 'Dia 5',
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: 'Dia 6',
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: 'Dia 7',
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ];

  return (
    <div>
      {/* <div style={{ padding: 0 }} className="my-2">
        <div className="p-2 rounded d-flex align-items-center bg-light">
          <h5 className="mr-2" htmlFor="">
            Filtrar tempo:
          </h5>
          <select style={{ width: 150 }} className="form-control mr-1" id="">
            <option value="">Dia</option>
            <option value="">Ultimos 30 dias</option>
            <option value="">Mês</option>
          </select>
          <button className="btn btn-success">Aplicar</button>
        </div>
      </div> */}

      <Cards />
      {/* <ModalChamada /> */}

      <Card className="my-3 p-3">
        <TabelaChamados />
      </Card>

      <div style={{ width: '100%', height: 300 }} className="card col-12">
        <h3 className="p-2 text-muted">Numero de chamadas por dia</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { Home };
