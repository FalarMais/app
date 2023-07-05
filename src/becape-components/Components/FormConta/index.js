import React, { Fragment, useState } from "react";
import { v4 } from "uuid";
import { useApiRequest } from "../../hooks/useApiRequest";
import { toast } from "react-toastify";
import { revalidarForm, validarForm } from "../../utils/validarForm";

const contaVazia = {
  id: "",
  clienteId: "",
  context: "",
  callLimit: "",
  login: "",
  senha: "",
  hash: "",
  host: ""
};

const FormConta = ({
  tipo,
  contaSelecionada,
  clienteSelecionado,
  setContas,
  contas
}) => {
  const [novaConta, setNovaConta] = useState(contaVazia);
  const { doRequest } = useApiRequest();

  function handleFormConta(event) {
    const { name, value } = event.target;
    setNovaConta({ ...novaConta, [name]: value });
  }

  async function criarConta(e) {
    const data = {
      ...novaConta,
      id: v4(),
      clienteId: clienteSelecionado.id
    };
    console.log(data);
    const contaResponse = await doRequest("post", "/Conta", data);

    console.log(contaResponse);
    const statusOk = [200, 201, 202];
    if (statusOk.includes(contaResponse.status)) {
      revalidarForm("form-conta");
      toast("Conta criada com sucesso!");
      setContas([...contas, novaConta]);
      setNovaConta(contaVazia);
    }
  }

  return (
    <Fragment>
      <form className="needs-validation form-conta" noValidate>
        {tipo === "add" ? (
          <Fragment>
            <div className="row">
              <div className="col-3 d-flex flex-column mb-2">
                <div>
                  <label className="mb-0" htmlFor="">
                    Context
                  </label>
                  <input
                    required
                    className="form-control"
                    onChange={e => handleFormConta(e)}
                    name="context"
                    value={novaConta.context}
                  />
                  <div className="invalid-feedback">Forneça um Context.</div>
                </div>
              </div>

              <div className="col-3 d-flex flex-column mb-2">
                <div>
                  <label className="mb-0" htmlFor="">
                    CallLimit
                  </label>
                  <input
                    required
                    className="form-control"
                    onChange={e => handleFormConta(e)}
                    name="callLimit"
                    value={novaConta.callLimit}
                  />
                  <div className="invalid-feedback">Forneça um callLimit.</div>
                </div>
              </div>

              <div className="col-3 d-flex flex-column mb-2">
                <div>
                  <label className="mb-0" htmlFor="">
                    login
                  </label>
                  <input
                    required
                    className="form-control"
                    onChange={e => handleFormConta(e)}
                    name="login"
                    value={novaConta.login}
                  />
                  <div className="invalid-feedback">Forneça um login</div>
                </div>
              </div>

              <div className="col-3 d-flex flex-column mb-2">
                <div>
                  <label className="mb-0" htmlFor="">
                    senha
                  </label>
                  <input
                    required
                    className="form-control"
                    onChange={e => handleFormConta(e)}
                    name="senha"
                    value={novaConta.senha}
                  />
                  <div className="invalid-feedback">Forneça uma senha.</div>
                </div>
              </div>

              <div className="col-3 d-flex flex-column mb-2">
                <div>
                  <label className="mb-0" htmlFor="">
                    hash
                  </label>
                  <input
                    required
                    className="form-control"
                    onChange={e => handleFormConta(e)}
                    name="hash"
                    value={novaConta.hash}
                  />
                  <div className="invalid-feedback">Forneça um hash.</div>
                </div>
              </div>

              <div className="col-3 d-flex flex-column mb-2">
                <div>
                  <label className="mb-0" htmlFor="">
                    host
                  </label>
                  <input
                    required
                    className="form-control"
                    onChange={e => handleFormConta(e)}
                    name="host"
                    value={novaConta.host}
                  />
                  <div className="invalid-feedback">Forneça um host.</div>
                </div>
              </div>
            </div>
            <button
              className="btn btn-falar"
              type="submit"
              onClick={e => validarForm(e, () => criarConta(), "form-conta")}
            >
              Criar conta
            </button>
          </Fragment>
        ) : (
          <div className="row">
            <div className="col-3 d-flex flex-column mb-2">
              <label className="mb-0" htmlFor="">
                Context
              </label>
              <span>{contaSelecionada.context}</span>
            </div>
            <div className="col-3 d-flex flex-column mb-2">
              <label className="mb-0" htmlFor="">
                callLimit
              </label>
              <span>{contaSelecionada.callLimit}</span>
            </div>
            <div className="col-3 d-flex flex-column mb-2">
              <label className="mb-0" htmlFor="">
                login
              </label>
              <span>{contaSelecionada.login}</span>
            </div>
            <div className="col-3 d-flex flex-column mb-2">
              <label className="mb-0" htmlFor="">
                senha
              </label>
              <span>{contaSelecionada.senha}</span>
            </div>
            <div className="col-3 d-flex flex-column mb-2">
              <label className="mb-0" htmlFor="">
                hash
              </label>
              <span>{contaSelecionada.hash}</span>
            </div>
            <div className="col-3 d-flex flex-column mb-2">
              <label className="mb-0" htmlFor="">
                host
              </label>
              <span>{contaSelecionada.host}</span>
            </div>
          </div>
        )}
      </form>
    </Fragment>
  );
};

export { FormConta };
