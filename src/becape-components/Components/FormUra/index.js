import React, { useState } from "react";
import { revalidarForm, validarForm } from "../../utils/validarForm";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { useApiRequest } from "../../hooks/useApiRequest";

const vazio = {
  contaId: "c9ad7bd4-8fdc-4ea4-9a92-c2698aa153e2",
  textoUra: "",
  audioOuTexto: null,
  maxEsperaOpcao: "",
  maxTentativas: "",
  textoErro: "",
  audioOuTextoErro: null,
  atendedorErrorId: "",
  discagemDireta: false,
  discarAntesTermino: false,
  descrição: "",
  id: "5778f879-0450-4eaa-b34d-d5ac8ec99759"
};

const FormUra = ({ tipo, data, refetch, atendedores = [] }) => {
  const [formURA, setFormURA] = useState(data ? data : vazio);
  const { doRequest } = useApiRequest();

  function handleForm(event) {
    const { name, value } = event.target;
    console.log(event.target.value);
    console.log(event.target.name);
    setFormURA({ ...formURA, [name]: value });
  }

  async function adicionarUra(tipo) {
    if (tipo === "add") {
      const dtform = {
        ...formURA,
        id: v4()
      };
      console.log(dtform);
      try {
        const request = await doRequest("post", `/Ura`, dtform);
        const { status } = request;

        if (status === 201) {
          revalidarForm(`formURA-${tipo}`);
          refetch();
          setFormURA(vazio);

          toast.success("Ura criado com sucesso!");
        } else {
          toast.warn("Não foi possível criar o Ura.");
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (tipo === "atualizar") {
      try {
        const request = await doRequest("put", `/Ura/${formURA.id}`, {
          ...formURA
        });
        console.log(request.status);
        revalidarForm(`formURA-${tipo}`);
        refetch();
        sessionStorage.setItem("formUra", JSON.stringify(formURA));

        toast.success("Ura atualizado com sucesso!");
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <form className={`needs-validation formURA-${tipo}`} noValidate>
      <div className="row">
        <div className="col-6 mb-4">
          <div className="d-flex flex-column">
            <label htmlFor="">Audio/Texto</label>
            <div>
              <input
                required
                className="mr-1"
                onChange={() => {
                  setFormURA({ ...formURA, audioOuTexto: true });
                }}
                checked={formURA.audioOuTexto === true && true}
                type="radio"
                name="audioTexto"
                id=""
              />
              <span className="mr-1">Audio URA EXEMPLO.mp3</span>
              <button className="btn btn-falar">Adicionar áudio</button>
            </div>
            <div className="invalid-feedback">Forneça um áudio.</div>
          </div>
        </div>
        <div className="col-6 mb-4">
          <div className="d-flex flex-column">
            <label htmlFor="">Audio/Texto Error</label>
            <div>
              <input
                required
                onChange={() => {
                  setFormURA({ ...formURA, audioOuTextoErro: true });
                }}
                checked={formURA.audioOuTextoErro === true && true}
                type="radio"
                name="audioTextoErro"
                className="mr-1"
                id=""
              />
              <span className="mr-1">Audio URA EXEMPLO.mp3</span>
              <button className="btn btn-falar">Adicionar áudio</button>
            </div>
            <div className="invalid-feedback">Forneça um áudio.</div>
          </div>
        </div>

        <div className="col-6 mb-4">
          <div className="d-flex flex-column">
            <label htmlFor="">Texto URA</label>
            <div className="d-flex">
              <input
                required
                checked={formURA.audioOuTexto === false && true}
                onChange={() => {
                  setFormURA({ ...formURA, audioOuTexto: false });
                }}
                type="radio"
                name="audioTexto"
                id=""
                className="mr-1"
              />
              <textarea
                required={formURA.audioOuTexto === false && true}
                type="text"
                className="form-control"
                onChange={e => handleForm(e)}
                value={formURA.textoUra}
                name="textoUra"
              />
            </div>

            <div className="invalid-feedback">Forneça um texto para URA</div>
          </div>
        </div>
        <div className="col-6 mb-4">
          <div className="d-flex flex-column">
            <label htmlFor="">Texto Erro</label>

            <div className="d-flex">
              <input
                required
                onChange={() => {
                  setFormURA({ ...formURA, audioOuTextoErro: false });
                }}
                checked={formURA.audioOuTextoErro === false && true}
                type="radio"
                name="audioTextoErro"
                id=""
                className="mr-1"
              />
              <textarea
                required={formURA.audioOuTextoErro === false && true}
                type="text"
                className="form-control"
                onChange={e => handleForm(e)}
                value={formURA.textoErro}
                name="textoErro"
              />
            </div>

            <div className="invalid-feedback">
              Forneça um texto para o erro.
            </div>
          </div>
        </div>

        <div className="col-3">
          <div>
            <label htmlFor="">Descrição</label>
            <input
              required
              className="form-control"
              onChange={e => handleForm(e)}
              name="descrição"
              value={formURA.descrição}
            />
            <div className="invalid-feedback">Forneça uma Descrição.</div>
          </div>
        </div>

        <div className="col-3">
          <div>
            <label htmlFor="">Máx. Espera Opção</label>
            <input
              required
              onChange={e => handleForm(e)}
              name="maxEsperaOpcao"
              className="form-control"
              type="number"
              value={formURA.maxEsperaOpcao}
            />

            <div className="invalid-feedback">
              Forneça um numero para o Máximo de Espera.
            </div>
          </div>
        </div>
        <div className="col-3">
          <div>
            <label htmlFor="">Máx. Tentativas</label>
            <input
              required
              className="form-control"
              onChange={e => handleForm(e)}
              name="maxTentativas"
              type="number"
              value={formURA.maxTentativas}
            />
            <div className="invalid-feedback">
              Forneça um numero para o Máximo de tentativas.
            </div>
          </div>
        </div>

        <div className="col-3 mb-4">
          <div>
            <label htmlFor="">Atendedor Padrão:</label>
            <select
              required
              type="text"
              className="form-control"
              onChange={e => handleForm(e)}
              name="atendedorErrorId"
              value={formURA.atendedorErrorId}
            >
              <option value="1" />
              {atendedores.map((atendedor, i) => (
                <option value={atendedor.id}>{`${atendedor.descrição}`}</option>
              ))}
            </select>
            <div className="invalid-feedback">
              Selecione um numero Atendedor Padrão.
            </div>
          </div>
        </div>

        <div className="col-6 mb-4">
          <div className="d-flex">
            <label class="m-0 mr-1" htmlFor="">
              Permitir Discagem Direta:
            </label>
            <div className="d-flex ">
              <div className="d-flex align-items-center mr-2">
                <label style={{ marginBottom: 0 }} className=" mr-1" htmlFor="">
                  Sim
                </label>
                <input
                  required
                  onChange={() => {
                    setFormURA({ ...formURA, discagemDireta: true });
                  }}
                  checked={formURA.discagemDireta === true && true}
                  type="radio"
                  name="discagemDireta"
                  id=""
                />
              </div>
              <div className="d-flex align-items-center">
                <label style={{ marginBottom: 0 }} className="mr-1">
                  Não
                </label>
                <input
                  required
                  checked={formURA.discagemDireta === false && true}
                  onChange={() => {
                    setFormURA({ ...formURA, discagemDireta: false });
                  }}
                  type="radio"
                  name="discagemDireta"
                  id=""
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 mb-4">
          <div className="d-flex">
            <label class="m-0 mr-1" htmlFor="">
              Permitir discar durante a execução do áudio:
            </label>
            <div className="d-flex ">
              <div className="d-flex align-items-center mr-2">
                <label style={{ marginBottom: 0 }} className="mr-1" htmlFor="">
                  Sim
                </label>
                <input
                  required
                  onChange={() => {
                    setFormURA({
                      ...formURA,
                      discarAntesTermino: true
                    });
                  }}
                  checked={formURA.discarAntesTermino === true && true}
                  type="radio"
                  name="discarAntesTermino"
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
                    setFormURA({
                      ...formURA,
                      discarAntesTermino: false
                    });
                  }}
                  checked={formURA.discarAntesTermino === false && true}
                  type="radio"
                  name="discarAntesTermino"
                  id=""
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="col-6">
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
                        Permitir discagem direta
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
                        Permitir discar durante a execução do áudio
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
      </div>

      <button
        className="btn btn-outline-falar my-2"
        type="submit"
        onClick={e =>
          validarForm(e, () => adicionarUra(tipo), `formURA-${tipo}`)
        }
      >
        {tipo}
      </button>
    </form>
  );
};

export { FormUra };
