import React, { useState } from "react";
import { revalidarForm, validarForm } from "../../utils/validarForm";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { v4 } from "uuid";
import { useApiRequest } from "../../hooks/useApiRequest";
import { toast } from "react-toastify";
const contaId = Cookies.get("contaId");

const vazio = {
  id: "",
  ramalId: "",
  descricao: "",
  ddd: "",
  number: "",
  host: "",
  nome: "",
  registro: true,
  contaId: contaId,
  senha: ""
};
const FormNumero = ({ tipo, data, refetch, ramais }) => {
  const [form, setForm] = useState(data ? data : vazio);
  const { doRequest } = useApiRequest();

  const changeForm = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  async function adicionarNumero() {
    if (tipo === "add") {
      const request = await doRequest("post", "/Numero", { ...form, id: v4() });
      const { status } = request;

      if (status === 201) {
        revalidarForm(`formNumero-${tipo}`);
        refetch();
        setForm(vazio);

        toast.success("Número criado com sucesso!");
      } else {
        toast.warn("Não foi possível criar o Número.");
      }
    }

    if (tipo === "atualizar") {
      const request = await doRequest("put", `/Numero/${form.id}`, form);
      const { status } = request;

      if (status === 202 || status === 200) {
        revalidarForm(`formNumero-${tipo}`);
        refetch();
        sessionStorage.setItem("formNumero", JSON.stringify(form));
        toast.success("Número atualizado com sucesso!");
      } else {
        toast.warn("Não foi possível atualizar o Número.");
      }
    }
  }

  useEffect(() => {
    if (data) {
      console.log(data);
      setForm(data);
    }
  }, [data]);

  return (
    <div className="my-4">
      <div className="" />
      <form className={`needs-validation formNumero-${tipo}`} noValidate>
        <div className="row">
          <div className="col-4 mb-4">
            <div>
              <label htmlFor="">Nome: </label>
              <input
                className="form-control"
                onChange={changeForm}
                value={form.nome}
                name="nome"
                required
              />
              <div className="invalid-feedback">Forneça o nome.</div>
            </div>
          </div>

          <div className="col-4 mb-4">
            <div>
              <label htmlFor="">Descrição</label>
              <input
                className="form-control"
                name="descricao"
                onChange={changeForm}
                value={form.descricao}
                required
              />
              {form.tipo === "2" ? (
                <div className="invalid-feedback">Forneça a descrição</div>
              ) : null}
            </div>
          </div>

          <div className="col-4 mb-4">
            <div>
              <label htmlFor="">Host </label>
              <input
                name="host"
                onChange={changeForm}
                value={form.host}
                className="form-control"
                required
              />
              <div className="invalid-feedback">Forneça o host.</div>
            </div>
          </div>

          <div className="col-2 mb-4">
            <div>
              <label htmlFor="">DDD</label>
              <input
                name="ddd"
                onChange={changeForm}
                value={form.ddd}
                type="number"
                className="form-control"
                required
              />
              <div className="invalid-feedback">Forneça o DDD.</div>
            </div>
          </div>

          <div className="col-4 mb-4">
            <div>
              <label htmlFor="">Número</label>
              <input
                name="number"
                onChange={changeForm}
                value={form.number}
                type="number"
                className="form-control"
                required
              />
              <div className="invalid-feedback">Forneça o número.</div>
            </div>
          </div>

          <div className="col-4 mb-4">
            <div>
              <label htmlFor="">Senha</label>
              <input
                name="senha"
                onChange={changeForm}
                value={form.senha}
                className="form-control"
                required
              />
              <div className="invalid-feedback">Forneça a senha.</div>
            </div>
          </div>

          <div className="col-4 mb-4">
            <div>
              <label htmlFor="">Ramal</label>
              <select
                name="ramalId"
                id=""
                className="form-control"
                value={form.ramalId}
                onChange={changeForm}
                required
              >
                <option value="">--SELECIONE--</option>
                {ramais.map(ramal => (
                  <option value={ramal.id}>{ramal.nomeUtilizador}</option>
                ))}
              </select>
              <div className="invalid-feedback">Selecione o Ramal</div>
            </div>
          </div>

          <div className="col-6 mb-4">
            <div className="d-flex">
              <label class="m-0 mr-1" htmlFor="">
                Permitir registro:
              </label>
              <div className="d-flex ">
                <div className="d-flex align-items-center mr-2">
                  <label
                    style={{ marginBottom: 0 }}
                    className="mr-1"
                    htmlFor=""
                  >
                    Sim
                  </label>
                  <input
                    required
                    onChange={() => {
                      setForm({
                        ...form,
                        registro: true
                      });
                    }}
                    checked={form.registro === true && true}
                    type="radio"
                    name="registro"
                    id=""
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label style={{ marginBottom: 0 }} className="mr-1">
                    Não
                  </label>
                  <input
                    required
                    onChange={() => {
                      setForm({
                        ...form,
                        registro: false
                      });
                    }}
                    checked={form.registro === false && true}
                    type="radio"
                    name="registro"
                    id=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn btn-outline-falar my-2"
          type="submit"
          onClick={e =>
            validarForm(e, () => adicionarNumero(), `formNumero-${tipo}`)
          }
        >
          {tipo}
        </button>
      </form>
    </div>
  );
};

export { FormNumero };
