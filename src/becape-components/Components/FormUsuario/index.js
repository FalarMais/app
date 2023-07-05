import React from "react";
import { useState } from "react";
import { revalidarForm, validarForm } from "../../utils/validarForm";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { useApiRequest } from "../../hooks/useApiRequest";

const usuarioVazio = {
  id: "",
  nome: "",
  email: "",
  senha: ""
};
const FormUsuario = ({ setUsuarios, usuarios, contaSelecionada }) => {
  const [novoUsuario, setNovoUsuario] = useState(usuarioVazio);
  const { doRequest } = useApiRequest();

  function handleFormUsuario(event) {
    const { name, value } = event.target;
    setNovoUsuario({ ...novoUsuario, [name]: value });
  }

  async function criarUsuario() {
    const data = {
      ...novoUsuario,
      id: v4(),
      contaId: contaSelecionada.id
    };

    const usuariosResponse = await doRequest("post", "/Usuario", data);
    const statusOk = [200, 201, 202];
    if (statusOk.includes(usuariosResponse.status)) {
      revalidarForm("form-usuario");
      toast("Usuario criado com sucesso!");
      setUsuarios([...usuarios, novoUsuario]);
      setNovoUsuario(usuarioVazio);
    }
  }

  return (
    <form className="needs-validation form-usuario" noValidate>
      <div className="row">
        <div className="col-3 d-flex flex-column mb-2">
          <div>
            <label className="mb-0" htmlFor="">
              Nome
            </label>
            <input
              required
              className="form-control"
              onChange={e => handleFormUsuario(e)}
              name="nome"
              value={novoUsuario.nome}
            />
            <div className="invalid-feedback">
              Forneça um numero para o Máximo de tentativas.
            </div>
          </div>
        </div>

        <div className="col-3 d-flex flex-column mb-2">
          <div>
            <label className="mb-0" htmlFor="">
              Email
            </label>
            <input
              required
              className="form-control"
              onChange={e => handleFormUsuario(e)}
              name="email"
              type="email"
              value={novoUsuario.email}
            />
            <div className="invalid-feedback">
              Forneça um numero para o Máximo de tentativas.
            </div>
          </div>
        </div>

        <div className="col-3 d-flex flex-column mb-2">
          <div>
            <label className="mb-0" htmlFor="">
              Senha
            </label>
            <input
              required
              className="form-control"
              onChange={e => handleFormUsuario(e)}
              name="senha"
              value={novoUsuario.senha}
            />
            <div className="invalid-feedback">
              Forneça um numero para o Máximo de tentativas.
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-falar"
        onClick={e => validarForm(e, () => criarUsuario(), "form-usuario")}
      >
        Criar usuário
      </button>
    </form>
  );
};

export { FormUsuario };
