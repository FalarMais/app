import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Card, CardBody } from "reactstrap";
import FalconCardHeader from "../../../components/common/FalconCardHeader";

import { validarForm } from "../../utils/validarForm";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/worker-javascript";
import { useApiRequest, useApiRequestEffect } from "../../hooks/useApiRequest";
import { toast } from "react-toastify";

// import "monaco-editor/esm/vs/editor/editor.all.js";
// import "monaco-editor/esm/vs/editor/editor.main.css";

const Conta = () => {
  const contaId = Cookies.get("contaId");
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

  const { response, isLoading } = useApiRequestEffect(`/Conta/${contaId}`);

  const { doRequest } = useApiRequest();
  const history = useHistory();

  useEffect(() => {
    if (!isLoading) {
      setFormConta(response.content);
    }
  }, [isLoading, response.content]);

  const salvar = async () => {
    try {
      const atualizarResponse = await doRequest(
        "put",
        `/Conta/${contaId}`,
        formConta
      );
      console.log(formConta);
      if (atualizarResponse.status === 202) {
        toast.success("Conta atualizada com sucesso!");
      }
    } catch (err) {
      toast.warn("Não foi possível atualizar a conta!");
      console.log(err);
    }
  };

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
            <div className="col-4 mb-4">
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
            <div className="col-4 mb-4">
              <div>
                <label htmlFor="">Senha</label>
                <input
                  className="form-control"
                  onChange={e => handleForm(e)}
                  value={formConta.senha}
                  name="senha"
                />
              </div>
            </div>

            <div className="col-4 mb-4">
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

            <div className="col-4 mb-4">
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

            <div className="col-4 mb-4">
              <div>
                <label htmlFor="">Hash</label>
                <input
                  className="form-control"
                  onChange={e => handleForm(e)}
                  value={formConta.hash}
                  name="hash"
                />
              </div>
            </div>
            <div className="col-4 mb-4">
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
            <div className="col-6">
              <div>
                <label htmlFor="">Template SIP</label>
                {/* <textarea
                  required
                  className="form-control"
                  onChange={e => handleForm(e)}
                  name="templateSIP"
                  value={formConta.templateSIP ? null : ""}
                /> */}
                <AceEditor
                  mode="javascript"
                  theme="textmate"
                  enableLiveAutocompletion={true}
                  name="template-sip"
                  value={formConta.templateSIP}
                  onChange={newValue =>
                    setFormConta({ ...formConta, templateSIP: newValue })
                  }
                  onv
                  editorProps={{ $blockScrolling: true }}
                />
                <div className="invalid-feedback">Forneça Template SIP.</div>
              </div>
            </div>

            <div className="col-6">
              <div>
                <label htmlFor="">Template Extension</label>
                {/* <textarea
                  required
                  className="form-control"
                  onChange={e => handleForm(e)}
                  name="templateSIP"
                /> */}
                <AceEditor
                  mode="javascript"
                  theme="textmate"
                  value={formConta.templateExtension}
                  enableLiveAutocompletion={true}
                  onChange={newValue =>
                    setFormConta({ ...formConta, templateExtension: newValue })
                  }
                  name="template-extension"
                  editorProps={{ $blockScrolling: true }}
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
