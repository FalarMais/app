import React, { useState } from "react";
import { validarForm } from "../../utils/validarForm";

export const exemplo = {
  nomeUtilizador: "teste",
  tipo: "1",
  senha: "string",
  callLimit: 0,
  ligacaoExterna: true,
  ligacaoSenha: true,
  aGrupa: true,
  contaId: "e1d6605a-3f43-4a3b-8aa5-3820ba62953d",
  pickupGroup: "string",
  callGroup: "string",
  mac: "string",
  modelo: 0,
  id: "1a6b18db-0f1b-4e12-b6d8-10aa65665e97"
};

const vazio = {
  nomeUtilizador: "",
  tipo: "",
  senha: "",
  callLimit: 0,
  ligacaoExterna: false,
  ligacaoSenha: false,
  aGrupa: false,
  contaId: "e1d6605a-3f43-4a3b-8aa5-3820ba62953d",
  pickupGroup: "",
  callGroup: "",
  mac: "",
  modelo: 0,
  id: "1a6b18db-0f1b-4e12-b6d8-10aa65665e97"
};
const FormRamal = ({ tipo, data }) => {
  const [form, setForm] = useState(data ? data : vazio);

  const changeForm = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  function adicionarRamal() {
    console.log(form);
  }

  return (
    <div className="my-4">
      <div className="" />
      <form className="needs-validation" noValidate>
        <div className="row">
          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Nome Utilizador</label>
              <input
                type="text"
                className="form-control"
                onChange={changeForm}
                value={form.nomeUtilizador}
                name="nomeUtilizador"
                required
              />
              <div className="invalid-feedback">
                Forneça o Nome do Utlizador.
              </div>
            </div>
          </div>

          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Tipo do Ramal</label>
              <select
                name="tipo"
                id=""
                className="form-control"
                value={form.tipo}
                onChange={changeForm}
                required
              >
                <option value="">--SELECIONE--</option>
                <option value="0">Padrão</option>
                <option value="1">Softphone</option>
                <option value="2">Cisco</option>
              </select>
              <div className="invalid-feedback">Selecione o Tipo do Ramal</div>
            </div>
          </div>

          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">MAC Address</label>
              <input
                type="text"
                className="form-control"
                name="mac"
                onChange={changeForm}
                value={form.mac}
                required={form.tipo === "2" ? true : false}
              />
              {form.tipo === "2" ? (
                <div className="invalid-feedback">Forneça o Mac.</div>
              ) : null}
            </div>
          </div>

          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Modelo</label>
              <input
                name="modelo"
                onChange={changeForm}
                value={form.modelo}
                type="number"
                className="form-control"
                required
              />
              <div className="invalid-feedback">Forneça o Modelo.</div>
            </div>
          </div>

          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Senha</label>
              <input
                name="senha"
                onChange={changeForm}
                value={form.senha}
                type="text"
                className="form-control"
                required
              />
              <div className="invalid-feedback">
                Forneça a Senha do Utlizador.
              </div>
            </div>
          </div>

          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Call-limit</label>
              <input
                name="callLimit"
                onChange={changeForm}
                value={form.callLimit}
                type="number"
                className="form-control"
                required
              />
              <div className="invalid-feedback">
                Forneça um numero para o Call-limit.
              </div>
            </div>
          </div>

          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Call Group</label>
              <input
                name="callGroup"
                onChange={changeForm}
                value={form.callGroup}
                type="text"
                className="form-control"
                required
              />
              <div className="invalid-feedback">Forneça o Call Group.</div>
            </div>
          </div>

          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Pickup Group</label>
              <input
                onChange={changeForm}
                value={form.pickupGroup}
                name="pickupGroup"
                type="text"
                className="form-control"
                required
              />
              <div className="invalid-feedback">Forneça o Pickup Group.</div>
            </div>
          </div>

          <div className="col-4 mb-4">
            <div className="d-flex">
              <label className="m-0 mr-1" htmlFor="">
                Ligação Externa:
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
                    name="ligacaoExterna"
                    checked={form.ligacaoExterna === true && true}
                    onChange={() => setForm({ ...form, ligacaoExterna: true })}
                    required
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label style={{ marginBottom: 0 }} className="mr-1">
                    Não
                  </label>
                  <input
                    name="ligacaoExterna"
                    checked={form.ligacaoExterna === false && true}
                    onChange={() => setForm({ ...form, ligacaoExterna: false })}
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
                Ligação Senha:
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
                    checked={form.ligacaoSenha === true && true}
                    onChange={() => setForm({ ...form, ligacaoSenha: true })}
                    name="ligacaoSenha"
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
                    checked={form.ligacaoSenha === false && true}
                    onChange={() => setForm({ ...form, ligacaoSenha: false })}
                    name="ligacaoSenha"
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
                aGrupa:
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
                    checked={form.aGrupa === true && true}
                    onChange={() => setForm({ ...form, aGrupa: true })}
                    name="aGrupa"
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
                    checked={form.aGrupa === false && true}
                    onChange={() => setForm({ ...form, aGrupa: false })}
                    name="aGrupa"
                    id=""
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-6">
            <table className="tabela-campos">
            <thead>
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
                      Ligação externa
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
                      Ligação senha
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
                      aGrupa
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
          onClick={e => validarForm(e, () => adicionarRamal())}
        >
          {tipo}
        </button>
      </form>
    </div>
  );
};

export { FormRamal };
