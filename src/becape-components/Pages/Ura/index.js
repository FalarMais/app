import React, { useEffect } from "react";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import FalconCardHeader from "../../../components/common/FalconCardHeader";

const Ura = () => {
  const [data, setData] = useState([]);
  const [uras] = useState([
    {
      nome: "URA HMEF - v2.2 ADVERTIME SOUND.mp3",
      href:
        "https://file-examples.com/storage/fe563fce08645a90397f28d/2017/11/file_example_MP3_700KB.mp3",
      selecionado: true
    },
    {
      nome: "URA 2 - v2.2 ADVERTIME SOUND.mp3",
      href:
        "https://file-examples.com/storage/fe563fce08645a90397f28d/2017/11/file_example_MP3_700KB.mp3",
      selecionado: false
    }
  ]);
  const chamadas = [
    {
      opcao: "1",
      destino: "SERVIÇO SOCIAL",
      ramal: "1033"
    },
    {
      opcao: "2",
      destino: "RH",
      ramal: "1161"
    },
    {
      opcao: "3",
      destino: "COMPRAS",
      ramal: "1151"
    },
    {
      opcao: "4",
      destino: "FINANCEIRO",
      ramal: "1157"
    },
    {
      opcao: "5",
      destino: "OUVIDORIA",
      ramal: "1034"
    },
    {
      opcao: "6",
      destino: "ADM",
      ramal: "1001"
    },
    {
      opcao: "7",
      destino: "TI",
      ramal: "1170"
    },
    {
      opcao: "8",
      destino: "NIR",
      ramal: "1022"
    },
    {
      opcao: "9",
      destino: "RECEPÇÃO HOSPITAL",
      ramal: "1027"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      try {
        if (chamadas) {
          setData(chamadas);
          criarTabela();
        } else {
          setData([{ opcao: "-", destino: "-", rama: "-" }]);
          criarTabela();
        }
      } catch {
        setData([{ opcao: "-", destino: "-", rama: "-" }]);
      }
    }, 1000);

    // eslint-disable-next-line
  }, []);

  const history = useHistory();

  function change(el) {
    console.log(el);
  }

  function criarTabela() {
    window.$("#example").DataTable({
      responsive: true,
      rowReorder: {
        selector: "td:nth-child(2)"
      },
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.11.3/i18n/pt_br.json"
      },
      destroy: true,
      stateSave: true
    });
  }

  return (
    <Card>
      <FalconCardHeader title={`URA - FLUXO`} titleClass="text-falar">
        <button
          className="btn btn-outline-falar"
          onClick={() => history.goBack()}
        >
          <BsArrowLeft size={25} />
          Voltar
        </button>
      </FalconCardHeader>
      <CardBody>
        <div style={{ minHeight: 500 }}>
          <div className="d-flex justify-content-between">
            <h4 className="text-falar">
              URA - PASSE O MOUSE E CLIQUE NA JANELA
            </h4>
            <button className="btn btn-falar my-2">Adicionar</button>
          </div>
          {uras.map(u => (
            <>
              <a href={u.href} rel="noopener noreferrer" target="_blank">
                {u.nome}
              </a>
              <br />
            </>
          ))}
          <div className="mt-3">
            {data.length < 1 ? (
              <h1>Carregando</h1>
            ) : (
              <table
                id="example"
                className="display mt-3"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>OPÇÃO</th>
                    <th>SETOR DESTINO</th>
                    <th>RAMAL SETOR</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={i}>
                      <td>{d.opcao}</td>
                      <td onClick={event => change(event)}>{d.destino}</td>
                      <td>{d.ramal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export { Ura };
