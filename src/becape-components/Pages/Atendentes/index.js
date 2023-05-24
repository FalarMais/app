import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import Cookies from "js-cookie";

import FalconCardHeader from "../../../components/common/FalconCardHeader";
import { FormAtendedor } from "../../Components/FormAtendedor";
import { useInicializarTabela } from "../../hooks/useInicializarTabela";
import { useApiRequest, useApiRequestEffect } from "../../hooks/useApiRequest";

const contaId = Cookies.get("contaId");

const Atendedor = () => {
  const [addAtendedor, setAddAtendedor] = useState(false);
  const [atendedor, setAtendedor] = useState(false);
  const [data, setData] = useState([]);

  const { response, setResponse, refetch } = useApiRequestEffect(
    `/atendedor/conta/${contaId}`
  );

  useInicializarTabela(data);

  const { doRequest } = useApiRequest();
  const history = useHistory();

  useEffect(() => {
    window
      .$("#example")
      .DataTable()
      .destroy();

    if (response.content) {
      setData(response.content);
    } else {
      setData([]);
    }

    if (atendedor) {
      let cl = JSON.parse(sessionStorage.getItem("formAtendedor"));
      setAtendedor(false);

      setTimeout(() => {
        setAtendedor(cl);
      }, 100);
    }
    // eslint-disable-next-line
  }, [response]);

  const excluirAtendedor = async (e, id) => {
    e.stopPropagation();
    setAtendedor(null);
    const verificarSolicitacao = window.confirm(
      `Deseja excluir a chamada ${id}?`
    );

    if (verificarSolicitacao) {
      try {
        await doRequest("delete", `/atendedor/${id}`);
        const contentFiltrado = data.filter(a => a.id !== id);
        setResponse({ content: contentFiltrado });
      } catch (err) {}
    }
  };

  const editarAtendedor = d => {
    setAtendedor(atendedor.id === d.id ? false : d);
  };
  return (
    <Card>
      <FalconCardHeader title={`Atendedores`} titleClass="text-falar">
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
          <h5 className="mb-2">Lista de Atendedores</h5>
          <div
            className="btn btn-falar"
            onClick={() => setAddAtendedor(!addAtendedor)}
          >
            {" "}
            Adicionar Atendedor
          </div>
        </div>
        {addAtendedor === true ? (
          <div className="mb-3">
            <FormAtendedor tipo="add" refetch={refetch} />
          </div>
        ) : null}

        <div style={{ minHeight: 500 }}>
          {data.length > 0 ? (
            <div>
              <table id="example" className="display" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>I. Posicao</th>
                    <th>I. Tempo Espera</th>
                    <th>D. Fim Música</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={i} onClick={() => editarAtendedor(d)}>
                      <td>{d.nome}</td>
                      <td>{d.tipoAtendimento}</td>
                      <td>{String(d.informarPosicao)}</td>
                      <td>{String(d.informarTempoEspera)}</td>
                      <td>{String(d.desligarFimMusica)}</td>
                      <td>
                        <div
                          onClick={e => excluirAtendedor(e, d.id)}
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
              {atendedor ? (
                <div className="my-4">
                  <FormAtendedor
                    tipo="atualizar"
                    data={atendedor}
                    refetch={refetch}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <h1>CARREGANDO</h1>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export { Atendedor };
