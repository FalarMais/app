import React, { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import FalconCardHeader from "../../../components/common/FalconCardHeader";
import { useState } from "react";

import { FormUra } from "../../Components/FormUra";
import Cookies from "js-cookie";
import {
  // useApiRequest,
  useApiRequestEffect
} from "../../hooks/useApiRequest";
import { useInicializarTabela } from "../../hooks/useInicializarTabela";

const ConfigUra = () => {
  const [addUra, setAddUra] = useState(false);
  const [ura, setUra] = useState(false);
  const [data, setData] = useState([]);
  const contaId = Cookies.get("contaId");
  const {
    response,
    // setResponse,
    refetch,
    isLoading
  } = useApiRequestEffect(`/ura/conta/${contaId}`);

  useInicializarTabela(data);

  // const { doRequest } = useApiRequest();
  const history = useHistory();

  useEffect(() => {
    if (!isLoading && !response.content) {
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
    setUra(ura.id === d.id ? false : d);
  };

  const excluirUra = () => {};
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
            <FormUra tipo="add" refetch={refetch} />
          </div>
        ) : null}

        <div style={{ minHeight: 500 }}>
          {data.length > 0 ? (
            <div>
              <table id="example" className="display" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Audio ou texto</th>
                    <th>Audio ou texto error</th>
                    <th>Discagem direta</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={i} onClick={() => editarUra(d)}>
                      <td>desc</td>
                      <td>{String(d.audioOuTexto)}</td>
                      <td>{String(d.audioOuTextoErro)}</td>
                      <td>{String(d.discagemDireta)}</td>
                      <td>
                        <div
                          onClick={e => excluirUra(e, d.id)}
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
                  <FormUra tipo="atualizar" data={ura} refetch={refetch} />
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
