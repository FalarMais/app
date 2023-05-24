import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Card, CardBody } from "reactstrap";
import FalconCardHeader from "../../../components/common/FalconCardHeader";

import { validarForm } from "../../utils/validarForm";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { api } from "../../services/api";

const Conta = () => {
  const [formConta, setFormConta] = useState({
    context: "",
    callLimit: "",
    login: "",
    senha: "",
    hash: "",
    host: "",
    clienteId: "",
    templateSIP: "",
    templateExtension: "",
    id: ""
  });

  const contaId = Cookies.get("contaId");
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/conta/${contaId}`);
      setFormConta(data);
    })();
  }, [contaId]);

  const salvar = () => {};
  function handleForm(event) {
    const { name, value } = event.target;
    setFormConta({ ...formConta, [name]: value });
  }
  return (
    <Card>
      <FalconCardHeader title={`CONTA`} titleClass="text-falar">
        <button
          className="btn btn-outline-falar"
          onClick={() => history.goBack()}
        >
          <BsArrowLeft size={25} />
          Voltar
        </button>
      </FalconCardHeader>
      <CardBody>
        <form className="needs-validation" noValidate>
          <div className="row">
            <div className="col-4">
              <div>
                <label htmlFor="">Context</label>
                <input
                  required
                  className="form-control"
                  onChange={e => handleForm(e)}
                  value={formConta.context}
                  name="context"
                  type="text"
                />
                <div className="invalid-feedback">Forneça Context.</div>
              </div>
            </div>

            <div className="col-4">
              <div>
                <label htmlFor="">Call Limit</label>
                <input
                  required
                  className="form-control"
                  onChange={e => handleForm(e)}
                  value={formConta.callLimit}
                  name="callLimit"
                  type="number"
                />
                <div className="invalid-feedback">Forneça Call Limit.</div>
              </div>
            </div>
            <div className="col-4">
              <div>
                <label htmlFor="">Login</label>
                <input
                  required
                  className="form-control"
                  onChange={e => handleForm(e)}
                  value={formConta.login}
                  name="Login"
                />
                <div className="invalid-feedback">Forneça Login.</div>
              </div>
            </div>
            <div className="col-4">
              <div>
                <label htmlFor="">Senha</label>
                <input
                  required
                  className="form-control"
                  onChange={e => handleForm(e)}
                  value={formConta.senha}
                  name="senha"
                />
                <div className="invalid-feedback">Forneça Senha.</div>
              </div>
            </div>
            <div className="col-4">
              <div>
                <label htmlFor="">Hash</label>
                <input
                  required
                  className="form-control"
                  onChange={e => handleForm(e)}
                  value={formConta.hash}
                  name="hash"
                  type="number"
                />
                <div className="invalid-feedback">Forneça Hash.</div>
              </div>
            </div>
            <div className="col-4">
              <div>
                <label htmlFor="">HOST</label>
                <input
                  required
                  className="form-control"
                  onChange={e => handleForm(e)}
                  value={formConta.host}
                  name="host"
                />
                <div className="invalid-feedback">Forneça Host.</div>
              </div>
            </div>
            <div className="col-4">
              <div>
                <label htmlFor="">Template SIP</label>
                <input
                  required
                  className="form-control"
                  onChange={e => handleForm(e)}
                  name="templateSIP"
                  value={formConta.templateSIP ? null : ""}
                  type="number"
                />
                <div className="invalid-feedback">Forneça Template SIP.</div>
              </div>
            </div>

            <div className="col-4">
              <div>
                <label htmlFor="">Template Extension</label>
                <input
                  required
                  className="form-control"
                  onChange={e => handleForm(e)}
                  name="templateExtension"
                  value={formConta.templateExtension ? null : ""}
                  type="number"
                />
                <div className="invalid-feedback">
                  Forneça Template Extension.
                </div>
              </div>
            </div>
          </div>

          <button
            className="my-3 btn btn-falar"
            type="submit"
            onClick={e => validarForm(e, () => salvar())}
          >
            Salvar
          </button>
        </form>
      </CardBody>
    </Card>
  );
};

export { Conta };
