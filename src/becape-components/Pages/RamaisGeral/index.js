import React, { useEffect } from "react";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import FalconCardHeader from "../../../components/common/FalconCardHeader";
import { FormRamal, exemplo } from "../../Components/FormRamal";
import { useInicializarTabela } from "../../hooks/useInicializarTabela";
import Cookies from "js-cookie";
import { useApiRequest, useApiRequestEffect } from "../../hooks/useApiRequest";

const RamaisGeral = () => {
  const [data, setData] = useState([]);
  const [ramal, setRamal] = useState(null);
  const [addRamal, setAddRamal] = useState(false);
  const [atendedores, setAtendedores] = useState([]);

  const contaId = Cookies.get("contaId");
  const { doRequest } = useApiRequest();

  const { response, setResponse, refetch, isLoading } = useApiRequestEffect(
    `/Conta/${contaId}/ramal`
  );

  const history = useHistory();
  useInicializarTabela(data);

  useEffect(() => {
    if (!isLoading && !response.content) {
      const vazio = {
        codigo: "",
        nome: "",
        tipo: "",
        modelo: "",
        senha: ""
      };
      setData([vazio]);
    }
  }, [isLoading, response.content]);

  useEffect(() => {
    window
      .$("#example")
      .DataTable()
      .destroy();

    if (response.content) {
      setData(response.content);
    }

    if (ramal) {
      let cl = JSON.parse(sessionStorage.getItem("formRamal"));
      setRamal(false);

      setTimeout(() => {
        setRamal(cl);
      }, 100);
    }
    // eslint-disable-next-line
  }, [response]);

  useEffect(() => {
    (async () => {
      const response = await doRequest("get", `/Conta/${contaId}/atendedor`);
      if (response.content) {
        setAtendedores(response.content);
      }
    })();
  }, []);

  const excluirRamais = async (e, id) => {
    e.stopPropagation();
    setRamal(false);
    const verificarSolicitacao = window.confirm(
      `Deseja excluir a chamada ${id}?`
    );

    if (verificarSolicitacao) {
      try {
        await doRequest("delete", `/Ramais/${id}`);
        const contentFiltrado = data.filter(a => a.id !== id);
        setResponse({ content: contentFiltrado });
      } catch (err) {}
    }
  };

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
            <FormRamal tipo="add" refetch={refetch} atendedores={atendedores} />
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
                    <th>Mac</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr
                      key={i}
                      onClick={() => setRamal(ramal !== d ? d : null)}
                    >
                      <td>{d.nomeUtilizador}</td>
                      <td>{d.tipo}</td>
                      <td>{d.modelo}</td>
                      <td>{d.mac}</td>
                      <td>
                        <div
                          onClick={e => excluirRamais(e, d.id)}
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
                <FormRamal
                  tipo="atualizar"
                  data={ramal}
                  refetch={refetch}
                  atendedores={atendedores}
                />
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
