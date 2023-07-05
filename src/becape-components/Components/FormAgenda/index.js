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
  diaSemana: "",
  horaInicio: "",
  horaFim: "",
  atendedorId: "",
  diaMes: 0,
  mes: 0,
  prioridade: 0,
  contaId: contaId
};

const FormAgenda = ({
  tipo,
  data,
  refetch,
  atendedores,
  meses,
  diasDaSemana
}) => {
  const [form, setForm] = useState(data ? data : vazio);
  const { doRequest } = useApiRequest();

  const changeForm = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  async function adicionarAgenda() {
    if (tipo === "add") {
      const dtform = {
        ...form,
        diaSemana: Number(form.diaSemana),
        id: v4()
      };

      console.log(dtform);
      const request = await doRequest("post", "/Agenda", dtform);
      const { status } = request;

      if (status === 201) {
        revalidarForm(`formAgenda-${tipo}`);
        refetch();
        setForm(vazio);

        toast.success("Ramal criado com sucesso!");
      } else {
        toast.warn("Não foi possível criar o Atendedor.");
      }
    }

    if (tipo === "atualizar") {
      const dtform = {
        ...form,
        diaSemana: Number(form.diaSemana)
      };
      const request = await doRequest("put", `/Agenda/${form.id}`, dtform);
      const { status } = request;

      if (status === 202 || status === 200) {
        revalidarForm(`formAgenda-${tipo}`);
        refetch();
        sessionStorage.setItem("formAgenda", JSON.stringify(form));
        toast.success("Atendente atualizado");
      } else {
        toast.warn("Não foi possível atualizar o Atendedor.");
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
      <form className={`needs-validation formAgenda-${tipo}`} noValidate>
        <div className="row">
          <div className="col-4 mb-4">
            <div>
              <label htmlFor="">Mês</label>
              <select
                name="mes"
                id=""
                className="form-control"
                value={form.mes}
                onChange={changeForm}
                required
              >
                <option value="">--SELECIONE--</option>
                {meses.map(mes => (
                  <option value={mes.valor}>{mes.mes}</option>
                ))}
              </select>
              <div className="invalid-feedback">Forneça o mes.</div>
            </div>
          </div>

          <div className="col-4 mb-4">
            <div>
              <label htmlFor="">Dia do mês</label>
              <input
                name="diaMes"
                onChange={changeForm}
                value={form.diaMes}
                type="number"
                className="form-control"
                required
              />
              <div className="invalid-feedback">Forneça um dia do mês.</div>
            </div>
          </div>

          <div className="col-4 mb-4">
            <div>
              <label htmlFor="">Dia da semana</label>
              <select
                name="diaSemana"
                id=""
                className="form-control"
                value={form.diaSemana}
                onChange={changeForm}
                required
              >
                <option value="">--SELECIONE--</option>
                {diasDaSemana.map(dia => (
                  <option value={dia.valor}>{dia.dia}</option>
                ))}
              </select>
              <div className="invalid-feedback">Forneça o Dia da Semana.</div>
            </div>
          </div>

          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Horário de Ínicio</label>
              <input
                type="text"
                className="form-control"
                name="horaInicio"
                onChange={changeForm}
                value={form.horaInicio}
                required
              />
              {form.tipo === "2" ? (
                <div className="invalid-feedback">Forneça o horário</div>
              ) : null}
            </div>
          </div>

          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Horário do Fim </label>
              <input
                name="horaFim"
                onChange={changeForm}
                value={form.horaFim}
                className="form-control"
                required
              />
              <div className="invalid-feedback">Forneça o horário.</div>
            </div>
          </div>

          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Prioridade</label>
              <input
                onChange={changeForm}
                value={form.prioridade}
                name="prioridade"
                type="number"
                className="form-control"
                required
              />
              <div className="invalid-feedback">Forneça a prioridade.</div>
            </div>
          </div>

          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Atendedor</label>
              <select
                name="atendedorId"
                id=""
                className="form-control"
                value={form.atendedorId}
                onChange={changeForm}
                required
              >
                <option value="">--SELECIONE--</option>
                {atendedores.map(atendedor => (
                  <option value={atendedor.id}>{atendedor.descrição}</option>
                ))}
              </select>
              <div className="invalid-feedback">Selecione o Atendedor</div>
            </div>
          </div>
        </div>
        <button
          className="btn btn-outline-falar my-2"
          type="submit"
          onClick={e => validarForm(e, () => adicionarAgenda())}
        >
          {tipo}
        </button>
      </form>
    </div>
  );
};

export { FormAgenda };
