import React, { Fragment, useEffect, useState } from "react";
import { useApiRequest, useApiRequestEffect } from "../../hooks/useApiRequest";
import { useInicializarTabela } from "../../hooks/useInicializarTabela";
import Cookies from "js-cookie";

import { FormNumero } from "../../Components/FormNumero";

const Numeros = () => {
  const [addNumero, setAddNumero] = useState(false);
  const [numero, setNumero] = useState(false);
  const [data, setData] = useState([]);
  const [ramais, setRamais] = useState([]);
  const { doRequest } = useApiRequest();
  const contaId = Cookies.get("contaId");
  const { response, setResponse, refetch, isLoading } = useApiRequestEffect(
    `/Numero`
  );

  useInicializarTabela(data);

  useEffect(() => {
    if (!isLoading && (!response.content || response.content.length === 0)) {
      const vazio = {
        id: 123,
        descricao: "-",
        ddd: "-",
        number: "-",
        host: "-",
        nome: "-",
        registro: "-"
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

    if (numero) {
      let cl = JSON.parse(sessionStorage.getItem("formNumero"));
      setNumero(false);

      setTimeout(() => {
        setNumero(cl);
      }, 100);
    }
    // eslint-disable-next-line
  }, [response]);

  const editarNumero = d => {
    setNumero(numero.id === d.id ? false : d);
  };

  const excluirNumero = async (e, id) => {
    e.stopPropagation();
    setNumero(false);
    const verificarSolicitacao = window.confirm(
      `Deseja excluir o número ${id}?`
    );

    if (verificarSolicitacao) {
      try {
        await doRequest("delete", `/Numero/${id}`);
        const contentFiltrado = data.filter(a => a.id !== id);
        setResponse({ content: contentFiltrado });
      } catch (err) {}
    }
  };

  useEffect(() => {
    (async () => {
      const response = await doRequest("get", `/Conta/${contaId}/ramal`);
      if (response.content) {
        setRamais(response.content);
      }
    })();
  }, [contaId, doRequest]);

  return (
    <Fragment>
      <div className="mb-4 d-flex justify-content-between">
        <h5 className="mb-2">Lista de Números</h5>
        <div className="btn btn-falar" onClick={() => setAddNumero(!addNumero)}>
          {" "}
          Adicionar Número
        </div>
      </div>
      {addNumero ? (
        <div className="mb-3">
          <FormNumero tipo="add" refetch={refetch} ramais={ramais} />
        </div>
      ) : null}

      <div style={{ minHeight: 500 }}>
        {data.length > 0 ? (
          <div>
            <table id="example" className="display" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>DDD</th>
                  <th>Número</th>
                  <th>HOST</th>
                  <th>Nome</th>
                  <th>Registro</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i} onClick={() => editarNumero(d)}>
                    <td>{d.descricao}</td>
                    <td>{d.ddd}</td>
                    <td>{d.number}</td>
                    <td>{d.host}</td>
                    <td>{d.name}</td>
                    <td>{String(d.registro)}</td>
                    <td>
                      <div
                        onClick={e => excluirNumero(e, d.id)}
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
            {numero ? (
              <div className="my-4">
                <FormNumero
                  tipo="atualizar"
                  data={numero}
                  refetch={refetch}
                  ramais={ramais}
                />
              </div>
            ) : null}
          </div>
        ) : (
          <h1>CARREGANDO</h1>
        )}
      </div>
    </Fragment>
  );
};

export { Numeros };
