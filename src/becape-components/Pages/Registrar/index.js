import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import FalconCardHeader from "../../../components/common/FalconCardHeader";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useApiRequest, useApiRequestEffect } from "../../hooks/useApiRequest";
import { toast } from "react-toastify";
import { FormCliente } from "../../Components/FormCliente";
import { FormConta } from "../../Components/FormConta";
import { FormUsuario } from "../../Components/FormUsuario";
import { MdDelete } from "react-icons/md";

const Registrar = () => {
  const {
    response,
    // setResponse,
    // refetch,
    isLoading
  } = useApiRequestEffect(`/Cliente`);
  const { doRequest } = useApiRequest();

  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(false);
  const [addCliente, setAddCliente] = useState(false);
  const [contas, setContas] = useState([]);
  const [addConta, setAddConta] = useState(false);
  const [contaSelecionada, setContaSelecionada] = useState(false);

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    if (response.content) {
      setClientes(response.content);
    }
  }, [response]);
  const history = useHistory();

  const selecionarCliente = async cliente => {
    setClienteSelecionado(
      cliente.id === clienteSelecionado.id ? false : cliente
    );
    setContas([]);
    setContaSelecionada(false);

    const contasResponse = await doRequest(
      "get",
      `/Cliente/${cliente.id}/conta`
    );
    if (contasResponse.status === 200) {
      setContas(contasResponse.content.filter(c => c.ativo));
    }
  };

  async function selecionarConta(conta) {
    setContaSelecionada(conta.id === contaSelecionada.id ? false : conta);
    const usuariosResponse = await doRequest(
      "get",
      `/Conta/${conta.id}/usuario`
    );
    console.log(usuariosResponse.content);
    if (usuariosResponse.status === 200) {
      setUsuarios(usuariosResponse.content);
    }
  }

  async function excluirConta(conta) {
    const verificarSolicitacao = window.confirm(
      `Deseja excluir a conta ${conta.context}?`
    );

    if (verificarSolicitacao) {
      try {
        const deletar = await doRequest("delete", `/Conta/${conta.id}`);
        console.log(conta.id, deletar);
        setContaSelecionada(false);
        const contentFiltrado = contas.filter(a => a.id !== conta.id);
        setContas(contentFiltrado);
        toast.error("Conta deletada com sucesso.");
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <Card>
      <FalconCardHeader title={`Registro`} titleClass="text-falar">
        <button
          className="btn btn-outline-falar"
          onClick={() => history.goBack()}
        >
          <BsArrowLeft size={25} />
          Voltar
        </button>
      </FalconCardHeader>
      <CardBody>
        <div className="d-flex justify-content-between mb-2">
          <h4>Lista de clientes</h4>
          <button
            className="btn btn-falar btn-sm"
            onClick={() => setAddCliente(!addCliente)}
          >
            Adicionar cliente
          </button>
        </div>
        {addCliente ? (
          <>
            <h5>Adicionar Cliente</h5>
            <FormCliente tipo="adicionar" />
          </>
        ) : null}

        {!isLoading ? (
          <div className="border rounded p-2">
            {clientes.map((cliente, i) => (
              <div key={i}>
                <span
                  className="p-1"
                  onClick={() => selecionarCliente(cliente)}
                >
                  {cliente.razaoSocial}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div>...</div>
        )}
        {clienteSelecionado ? (
          <div className="my-3">
            <div className="row p-3">
              <FormCliente
                tipo="atualizar"
                data={clienteSelecionado}
                clientes={clientes}
                setClientes={setClientes}
              />
            </div>

            <div className="d-flex justify-content-between mb-2">
              <h4>Contas</h4>
              <button
                className="btn btn-falar btn-sm"
                onClick={() => setAddConta(!addConta)}
              >
                Adicionar conta
              </button>
            </div>

            {addConta ? (
              <>
                <h5>Adicionar Conta</h5>
                <div className="mb-3">
                  <FormConta
                    clienteSelecionado={clienteSelecionado}
                    contas={contas}
                    setContas={setContas}
                    tipo="add"
                  />
                </div>
              </>
            ) : null}

            <div className="border rounded p-2">
              {contas.length > 0
                ? contas.map((conta, i) => (
                    <div className="d-flex justify-content-between" key={i}>
                      <span
                        className="p-1"
                        onClick={() => selecionarConta(conta)}
                      >
                        {conta.context}
                      </span>
                      <button className="btn">
                        <MdDelete
                          size={20}
                          color="#EE565D"
                          onClick={() => excluirConta(conta)}
                        />
                      </button>
                    </div>
                  ))
                : "Nenhuma conta ativa"}
            </div>

            {contaSelecionada ? (
              <div>
                <div className="my-3">
                  <FormConta contaSelecionada={contaSelecionada} tipo="att" />
                </div>

                <h4>Usuários</h4>
                <div className="border rounded p-2">
                  {usuarios.length > 0
                    ? usuarios.map((usuario, i) => (
                        <div key={i}>
                          <span className="p-1">{usuario.email}</span>
                        </div>
                      ))
                    : "Nenhuma usuário vínculado"}
                </div>

                <div className="my-2">
                  <h5>Adicionar usuário</h5>
                  <FormUsuario
                    setUsuarios={setUsuarios}
                    usuarios={usuarios}
                    contaSelecionada={contaSelecionada}
                  />
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div />
        )}
      </CardBody>
    </Card>
  );
};

export { Registrar };
