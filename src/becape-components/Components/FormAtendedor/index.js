import React, { useState } from "react";
import { useEffect } from "react";
import { revalidarForm, validarForm } from "../../utils/validarForm";
import { v4 } from "uuid";
import Cookies from "js-cookie";
import { useApiRequest } from "../../hooks/useApiRequest";
import { toast } from "react-toastify";
import { ModalAudios } from "../../Pages/Ura/ModalAudios";
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
  descrição: "",
  tipoAtendimento: "",
  informaPosicaoSegundos: 0,
  informarPosicao: false,
  informarTempoEspera: false,
  desligarFimMusica: false,
  contaId: contaId,
  uraId: "00000000-0000-0000-0000-000000000000",
  id: v4()
};
const FormAtendedor = ({ tipo, data, refetch }) => {
  const [form, setForm] = useState(data ? data : vazio);
  const [abrirModal, setAbrirModal] = useState(false);

  const { doRequest } = useApiRequest();

  useEffect(() => {
    if (data) {
      var tipo = "";

      switch (data.tipoAtendimento) {
        case "Simultaneo":
          tipo = 1;
          break;
        case "Transbordo":
          tipo = 2;
          break;
        case "Balanceado":
          tipo = 3;
          break;
        default:
          tipo = null;
      }
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

      const request = await doRequest("post", "/Atendedor", dtform);
      console.log(request);
      const { status } = request;

      if (status === 201) {
        revalidarForm();
        refetch();
        setForm(vazio);

        toast.success("Atendente criado com sucesso!");
      } else {
        toast.warn("Não foi possível criar o Atendedor.");
      }
    }

    if (tipo === "atualizar") {
      const dtform = {
        nome: form.nome,
        informarPosicao: form.informarPosicao,
        informarTempoEspera: form.informarTempoEspera,
        desligarFimMusica: form.desligarFimMusica,
        uraId: form.uraId,
        contaId: contaId,
        id: form.id,
        descrição: form.descrição,
        informaPosicaoSegundos: form.informaPosicaoSegundos,
        tipoAtendimento: Number(form.tipoAtendimento)
      };

      const request = await doRequest("put", `/Atendedor/${form.id}`, dtform);
      const { status } = request;

      if (status === 202 || status === 200) {
        revalidarForm();
        refetch();
        sessionStorage.setItem("formAtendedor", JSON.stringify(dtform));
        toast.success("Atendente atualizado");
      } else {
        toast.warn("Não foi possível atualizar o Atendedor.");
      }
    }
  }

  return (
    <div id={tipo === "atualizar" && "form-att"} className="my-4">
      <ModalAudios abrirModal={abrirModal} setAbrirModal={setAbrirModal} />
      <div className="" />
      <form className="needs-validation" noValidate>
        <div className="row">
          <div className="col-4 mb-4">
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

          <div className="col-4 mb-4">
            <div>
              <label htmlFor="">Descrição</label>
              <textarea
                type="text"
                className="form-control"
                onChange={changeForm}
                value={form.descrição}
                name="descrição"
                required
              />
              <div className="invalid-feedback">Forneça a descrição.</div>
            </div>
          </div>

          <div className="col-4 mb-4">
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

          <div className="col-6 mb-4">
            <div>
              <label htmlFor="">Ura ID</label>
              <input
                type="text"
                className="form-control"
                onChange={changeForm}
                value={form.uraId}
                name="uraId"
                required
              />
              <div className="invalid-feedback">Forneça o URA ID.</div>
            </div>
          </div>

          <div className="col-6 mb-4">
            <div className="d-flex flex-column">
              <label htmlFor="">Audio de Espera</label>
              <div>
                <span className="mr-1">Audio URA EXEMPLO.mp3</span>
                <button
                  className="btn btn-falar"
                  type="button"
                  onClick={() => setAbrirModal(true)}
                >
                  Adicionar áudio
                </button>
              </div>
              <div className="invalid-feedback">Forneça um áudio.</div>
            </div>
          </div>
          {/* <div className="col-6 mb-4">
            <table className="tabela-campos">
              {/* <thead>
                  <th />
                  <th>
                    <label htmlFor="">Sim</label>
                  </th>
                  <th>
                    <label htmlFor="">Não</label>
                  </th>
                </thead> 
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="" className="m-0">
                      Informar posição
                    </label>
                  </td>

                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <label htmlFor="" className="m-0 mr-2">
                        Sim
                      </label>

                      <input type="radio" value="" />
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <label htmlFor="" className="m-0 mr-2">
                        Não
                      </label>
                      <input type="radio" value="" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="" className="m-0">
                      Informar tempo de espera
                    </label>
                  </td>

                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <label htmlFor="" className="m-0 mr-2">
                        Sim
                      </label>

                      <input type="radio" value="" />
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <label htmlFor="" className="m-0 mr-2">
                        Não
                      </label>
                      <input type="radio" value="" />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="" className="m-0">
                      Desligar chamada ao final da musica
                    </label>
                  </td>

                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <label htmlFor="" className="m-0 mr-2">
                        Sim
                      </label>

                      <input type="radio" value="" />
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <label htmlFor="" className="m-0 mr-2">
                        Não
                      </label>
                      <input type="radio" value="" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */}

          <div className="col-3 mb-4">
            <div className="d-flex">
              <label className="m-0 mr-1" htmlFor="">
                Informar Posição:
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
                    type="radio"
                    name="informarPosicao"
                    checked={form.informarPosicao === true && true}
                    onChange={() => setForm({ ...form, informarPosicao: true })}
                    required
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label style={{ marginBottom: 0 }} className="mr-1">
                    Não
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
          <div className="col-4 mb-4">
            <div className="d-flex">
              <label className="m-0 mr-1" htmlFor="">
                Informar Tempo Espera:
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
                    Não
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

          <div className="col-5 mb-4">
            <div className="d-flex">
              <label className="m-0" htmlFor="">
                Informar posição a cada
              </label>
              <input
                style={{ width: 70 }}
                type="number"
                className=" mx-2"
                onChange={changeForm}
                value={form.informaPosicaoSegundos}
                name="informaPosicaoSegundos"
              />
              <label className="m-0" htmlFor="">
                segundos
              </label>
              <div className="invalid-feedback">Forneça .</div>
            </div>
          </div>

          <div className="col-6 mb-4">
            <div className="d-flex">
              <label className="m-0 mr-1" htmlFor="">
                Desligar chamada ao final da música:
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
                    Não
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
