import React, { useEffect } from "react";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import FalconCardHeader from "../../../components/common/FalconCardHeader";
import { FormRamal, exemplo } from "../../Components/FormRamal";
import { useInicializarTabela } from "../../hooks/useInicializarTabela";

const RamaisGeral = () => {
  const [data, setData] = useState([]);
  const [ramal, setRamal] = useState(null);
  const [addRamal, setAddRamal] = useState(false);

  const history = useHistory();
  useInicializarTabela(data);

  const chamadas = [
    {
      codigo: "3445",
      nome: "nome1",
      tipo: "A4",
      modelo: "x",
      senha: "1"
    },
    {
      codigo: "3445",
      nome: "nome1",
      tipo: "A4",
      modelo: "x",
      senha: "1"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      window
        .$("#example")
        .DataTable()
        .destroy();

      setData(chamadas);
    }, 1000);
    // eslint-disable-next-line
  }, []);

  return (
    <Card>
      <FalconCardHeader title={`Geral`} titleClass="text-falar">
        <button
          className="btn btn-outline-falar"
          onClick={() => history.goBack()}
        >
          <BsArrowLeft size={25} />
          Voltar
        </button>
      </FalconCardHeader>
      <CardBody>
        <div className="mb-4 d-flex justify-content-between">
          <h5 className="mb-2">Lista de ramais</h5>
          <div className="btn btn-falar" onClick={() => setAddRamal(!addRamal)}>
            {" "}
            Adicionar ramal
          </div>
        </div>
        {addRamal ? (
          <div className="mb-3">
            <FormRamal tipo="add" />
          </div>
        ) : null}

        <div style={{ minHeight: 500 }}>
          {data.length > 0 ? (
            <>
              <table id="example" className="display" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Modelo</th>
                    <th>Senha</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr
                      key={i}
                      onClick={() => setRamal(ramal !== d ? d : null)}
                    >
                      <td>{d.nome}</td>
                      <td>{d.tipo}</td>
                      <td>{d.modelo}</td>
                      <td>{d.senha}</td>
                      <td>
                        <div
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
              {ramal ? (
                <div className="my-4">
                  <div className="d-flex justify-content-between">
                    <h1>
                      Nome utilizado: nome1
                      {/* {ramal.codigo} */}
                    </h1>
                    <span className="text-danger font-weight-bold">
                      <MdDelete size={30} />
                    </span>
                  </div>
                  <FormRamal tipo="atualizar" data={exemplo} />
                </div>
              ) : null}
            </>
          ) : (
            <h1>CARREGANDO</h1>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export { RamaisGeral };
