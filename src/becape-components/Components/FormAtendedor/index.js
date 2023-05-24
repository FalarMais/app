import React, { useState } from "react";
import { useEffect } from "react";
import { revalidarForm, validarForm } from "../../utils/validarForm";
import { v4 } from "uuid";
import Cookies from "js-cookie";
import { useApiRequest } from "../../hooks/useApiRequest";
import { toast } from "react-toastify";
const contaId = Cookies.get("contaId");

export const exemplo = {
  nome: "string",
  tipoAtendimento: 1,
  informarPosicao: true,
  informarTempoEspera: true,
  desligarFimMusica: true,
  contaId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
};

const vazio = {
  nome: "",
  tipoAtendimento: "",
  informarPosicao: false,
  informarTempoEspera: false,
  desligarFimMusica: false,
  contaId: contaId,
  id: v4()
};
const FormAtendedor = ({ tipo, data, refetch }) => {
  const [form, setForm] = useState(data ? data : vazio);
  const { doRequest } = useApiRequest();

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);
  const changeForm = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  async function adicionarRamal() {
    if (tipo === "add") {
      const dtform = {
        ...form,
        tipoAtendimento: Number(form.tipoAtendimento),
        id: v4()
      };

      const request = await doRequest("post", "/atendedor", dtform);
      const { status, message } = request;

      if (status === 200 || request === 201) {
        revalidarForm();
        refetch();
        setForm(vazio);

        toast.success("Atendente criado com sucesso!");
      } else {
        toast.warn(message);
      }
    }

    if (tipo === "atualizar") {
      const dtform = {
        nome: form.nome,
        informarPosicao: form.informarPosicao,
        informarTempoEspera: form.informarTempoEspera,
        desligarFimMusica: form.desligarFimMusica,
        contaId: contaId,
        id: form.id,
        tipoAtendimento: Number(form.tipoAtendimento)
      };

      console.log(dtform);
      const request = await doRequest("put", `/atendedor/${form.id}`, dtform);
      console.log(request);
      const { status, message } = request;

      if (status === 202 || status === 200) {
        revalidarForm();
        refetch();
        sessionStorage.setItem("formAtendedor", JSON.stringify(dtform));
        toast.success("Atendente atualizado");
      } else {
        toast.warn(message);
      }
    }
  }

  return (
    <div id={tipo === "atualizar" && "form-att"} className="my-4">
      <div className="" />
      <form className="needs-validation" noValidate>
        <div className="row">
          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Nome</label>
              <input
                type="text"
                className="form-control"
                onChange={changeForm}
                value={form.nome}
                name="nome"
                required
              />
              <div className="invalid-feedback">Forneça o Nome.</div>
            </div>
          </div>

          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Tipo Atendimento</label>
              <select
                name="tipoAtendimento"
                id=""
                className="form-control"
                value={form.tipoAtendimento}
                onChange={changeForm}
                required
              >
                <option value="">--SELECIONE--</option>
                <option value="1">Simultaneo</option>
                <option value="2">Transbordo</option>
                <option value="3">Balanceado</option>
                <option value="4">?</option>
              </select>
              <div className="invalid-feedback">
                Selecione o Tipo do Atendimento
              </div>
            </div>
          </div>

          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Informar Posição</label>
              <div className="d-flex ">
                <div className="d-flex align-items-center mr-2">
                  <label
                    style={{ marginBottom: 0 }}
                    className="mr-1"
                    htmlFor=""
                  >
                    Ligado
                  </label>
                  <input
                    type="radio"
                    name="informarPosicao"
                    checked={form.informarPosicao === true && true}
                    onChange={() => setForm({ ...form, informarPosicao: true })}
                    required
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label style={{ marginBottom: 0 }} className="mr-1">
                    Desligado
                  </label>
                  <input
                    name="informarPosicao"
                    checked={form.informarPosicao === false && true}
                    onChange={() =>
                      setForm({ ...form, informarPosicao: false })
                    }
                    type="radio"
                    id=""
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Informar Tempo Espera</label>
              <div className="d-flex ">
                <div className="d-flex align-items-center mr-2">
                  <label
                    style={{ marginBottom: 0 }}
                    className="mr-1"
                    htmlFor=""
                  >
                    Ligado
                  </label>
                  <input
                    checked={form.informarTempoEspera === true && true}
                    onChange={() =>
                      setForm({ ...form, informarTempoEspera: true })
                    }
                    name="informarTempoEspera"
                    type="radio"
                    id=""
                    required
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label style={{ marginBottom: 0 }} className="mr-1">
                    Desligado
                  </label>
                  <input
                    checked={form.informarTempoEspera === false && true}
                    onChange={() =>
                      setForm({ ...form, informarTempoEspera: false })
                    }
                    name="informarTempoEspera"
                    type="radio"
                    id=""
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Desligar Fim Musica</label>
              <div className="d-flex ">
                <div className="d-flex align-items-center mr-2">
                  <label
                    style={{ marginBottom: 0 }}
                    className="mr-1"
                    htmlFor=""
                  >
                    Ligado
                  </label>
                  <input
                    type="radio"
                    checked={form.desligarFimMusica === true && true}
                    onChange={() =>
                      setForm({ ...form, desligarFimMusica: true })
                    }
                    name="desligarFimMusica"
                    id=""
                    required
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label style={{ marginBottom: 0 }} className="mr-1">
                    Desligado
                  </label>
                  <input
                    type="radio"
                    checked={form.desligarFimMusica === false && true}
                    onChange={() =>
                      setForm({ ...form, desligarFimMusica: false })
                    }
                    name="desligarFimMusica"
                    id=""
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn btn-outline-falar my-2"
          type="submit"
          onClick={e => validarForm(e, () => adicionarRamal(tipo))}
        >
          {tipo}
        </button>
      </form>
    </div>
  );
};

export { FormAtendedor };
