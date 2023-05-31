import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const Grafico = ({ response }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const existeChamadas = response.content && response.content.length > 0;
    if (existeChamadas) {
      let chamadas = response.content.sort(function(a, b) {
        var dateA = new Date(a.data).getTime();
        var dateB = new Date(b.data).getTime();
        return dateA > dateB ? 1 : -1;
      });

      let arrayDatas = [];
      for (let i = 0; i < chamadas.length; i++) {
        const data = moment(chamadas[i].data).format("DD/MM");
        const existeData = arrayDatas.find(a => a.data === data);

        if (existeData) {
          existeData.quantidadeDia++;
        }
        if (!existeData) {
          const info = {
            data,
            quantidadeDia: 1
          };
          arrayDatas.push(info);
        }
      }

      setData(arrayDatas);
    }
  }, [response]);

  return (
    <div style={{ width: "100%", height: 300 }} className="card col-12">
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
          <XAxis dataKey="data" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="quantidadeDia"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export { Grafico };
