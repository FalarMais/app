import React, { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import FalconCardHeader from "../../../components/common/FalconCardHeader";
import { useState } from "react";

import { FormUra } from "../../Components/FormUra";
import Cookies from "js-cookie";
import {
  useApiRequest,
  // useApiRequest,
  useApiRequestEffect
} from "../../hooks/useApiRequest";
import { useInicializarTabela } from "../../hooks/useInicializarTabela";
import { toast } from "react-toastify";

const ConfigUra = () => {
  const contaId = Cookies.get("contaId");

  const [addUra, setAddUra] = useState(false);
  const [ura, setUra] = useState(false);
  const [data, setData] = useState([]);
  const [atendedores, setAtendedores] = useState([]);

  useInicializarTabela(data);
  const history = useHistory();
  const { doRequest } = useApiRequest();
  const { response, setResponse, refetch, isLoading } = useApiRequestEffect(
    `/Conta/${contaId}/ura`
  );

  useEffect(() => {
    if (!isLoading && (!response.content || response.content.length === 0)) {
      const vazio = {
        id: 123,
        nome: "-",
        audioOuTexto: "-",
        audioOuTextoErro: "-",
        informarTempoEspera: "-",
        discagemDireta: "-"
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
      console.log(response.content);
    }

    if (ura) {
      let cl = JSON.parse(sessionStorage.getItem("formUra"));
      setUra(false);

      setTimeout(() => {
        setUra(cl);
      }, 100);
    }
    // eslint-disable-next-line
  }, [response]);

  const editarUra = d => {
    console.log(d, d.id);
    setUra(ura.id === d.id ? false : d);
  };

  const excluirUra = async (event, ura) => {
    event.stopPropagation();
    setUra(false);
    const verificarSolicitacao = window.confirm(
      `Deseja excluir a ura ${ura.descrição}?`
    );

    if (verificarSolicitacao) {
      try {
        await doRequest("delete", `/Ura/${ura.id}`);
        const contentFiltrado = data.filter(a => a.id !== ura.id);
        setResponse({ content: contentFiltrado });
        toast.success("Ura deletada com sucesso");
      } catch (err) {
        toast.error("Falha ao deletar URA");
      }
    }
  };

  useEffect(() => {
    (async () => {
      const response = await doRequest("get", `/Conta/${contaId}/atendedor`);
      if (response.content) {
        setAtendedores(response.content);
      }
    })();
    //eslint-disable-next-line
  }, [contaId]);

  return (
    <Card>
      <FalconCardHeader title={`URA`} titleClass="text-falar">
        <button
          className="btn btn-outline-falar"
          onClick={() => history.goBack()}
        >
          <BsArrowLeft size={25} />
          Voltar
        </button>
      </FalconCardHeader>
      <CardBody>
        {/* <Audios
          audios={audios}
          setAudios={setAudios}
          abrirModal={abrirModal}
          setAbrirModal={setAbrirModal}
        /> */}
        <div className="mb-4 d-flex justify-content-between">
          <h5 className="mb-2">Lista de URAS</h5>
          <div className="btn btn-falar" onClick={() => setAddUra(!addUra)}>
            {" "}
            Adicionar Ura
          </div>
        </div>
        {addUra === true ? (
          <div className="mb-3">
            <FormUra tipo="add" refetch={refetch} atendedores={atendedores} />
          </div>
        ) : null}

        <div style={{ minHeight: 500 }}>
          {data.length > 0 ? (
            <div>
              <table id="example" className="display" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Áudio ou texto</th>
                    <th>Áudio ou texto error</th>
                    <th>Discagem direta</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={i} onClick={() => editarUra(d)}>
                      <td>{d.descrição}</td>
                      <td>{d.audioOuTexto ? "Áudio" : "Texto"}</td>
                      <td>{d.audioOuTextoErro ? "Áudio" : "Texto"}</td>
                      <td>{d.discagemDireta ? "Sim" : "Não"}</td>
                      <td>
                        <div
                          onClick={e => excluirUra(e, d)}
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
              {ura ? (
                <div className="my-4">
                  <FormUra
                    tipo="atualizar"
                    data={ura}
                    refetch={refetch}
                    atendedores={atendedores}
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

export { ConfigUra };
