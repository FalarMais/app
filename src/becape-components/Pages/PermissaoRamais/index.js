import React, { Fragment, useCallback, useEffect } from "react";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import FalconCardHeader from "../../../components/common/FalconCardHeader";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { RiEditCircleFill } from "react-icons/ri";

const PermissaoRamais = () => {
  // const [data, setData] = useState([
  //   { ramal: "", senha: "", bloqueado: "", tipo_bloq: "" }
  // ]);
  const [data, setData] = useState([]);

  const [edit, setEdit] = useState([]);

  const chamadas = [
    {
      ramal: "1001",
      senha: 1234,
      bloqueado: 1,
      tipo_bloq: "SEMPRE"
    },
    {
      ramal: "1002",
      senha: 1234,
      bloqueado: 0,
      tipo_bloq: "DIARIO"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      try {
        if (chamadas) {
          setData(chamadas);
          criarTabela();
        } else {
          setData([{ ramal: "-", senha: "-", bloqueado: "-", tipo_bloq: "-" }]);
          criarTabela();
        }
      } catch {
        setData([{ ramal: "-", senha: "-", bloqueado: "-", tipo_bloq: "-" }]);
      }
    }, 1000);

    // eslint-disable-next-line
  }, []);

  const history = useHistory();

  function trocandoBloqueio(e, indice) {
    let clRM = [...data];
    clRM[indice].tipo_bloq = e.target.value;
    console.log("clRM", clRM);
    setData(clRM);
  }
  function trocando(e, indice) {
    let clRM = [...data];
    clRM[indice].bloqueado = !e;
    console.log("bloqueado", e);
    setData(clRM);
  }
  useEffect(() => {
    console.log(data);
    console.log("atualizou");
  }, [data]);

  function change(el) {
    console.log(el);
  }

  function verificarIncludes(indice) {
    const estaEditando = edit.includes(indice);
    return estaEditando;
  }

  function editarSenha(i) {
    if (edit.includes(i)) {
      setEdit(edit.filter(e => e !== i));
    } else {
      setEdit([...edit, i]);
    }
  }

  function editandoCampos(e, indice) {
    let clRM = [...data];
    clRM[indice].senha = e.target.value;
    setData(clRM);
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
  const salvar = useCallback(() => {
    console.log(data);
  }, [data]);

  return (
    <Card>
      <FalconCardHeader title={`Permissões de Ramais`} titleClass="text-falar">
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
          <Fragment>
            {data.length < 1 ? (
              <h1>Carregando</h1>
            ) : (
              <table id="example" className="display" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Ramal</th>
                    <th>Senha</th>
                    <th>Bloqueado</th>
                    <th>Tipo de bloqueio</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={i}>
                      <td>{d.ramal}</td>
                      <td onClick={event => change(event)}>
                        {verificarIncludes(i) ? (
                          <input
                            type="text"
                            value={d.senha}
                            style={{ width: 80 }}
                            onChange={e => editandoCampos(e, i)}
                          />
                        ) : (
                          <span>{d.senha}</span>
                        )}
                        <RiEditCircleFill
                          color="#6F00B4"
                          onClick={() => editarSenha(i)}
                        />
                      </td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => trocando(d.bloqueado, i)}
                        >
                          {d.bloqueado ? (
                            <AiFillLock color="green" size={40} />
                          ) : (
                            <AiFillUnlock color="red" size={40} />
                          )}
                        </button>
                      </td>
                      <td>
                        <select
                          name=""
                          className="form-control"
                          id=""
                          value={d.tipo_bloq}
                          onChange={e => trocandoBloqueio(e, i)}
                        >
                          <option value="SEMPRE">SEMPRE</option>
                          <option value="DIARIO">DIÁRIO</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <button className="btn btn-outline-falar" onClick={() => salvar()}>
              Salvar
            </button>
          </Fragment>
        </div>
      </CardBody>
    </Card>
  );
};

export { PermissaoRamais };
