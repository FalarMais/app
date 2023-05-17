import React, { useState } from "react";

const FormRamal = ({ tipo }) => {
  const [form, setForm] = useState({ tipo: "" });

  const changeForm = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="my-4">
      <div className="" />
      <div className="row">
        <div className="col-3 mb-4">
          <div>
            <label htmlFor="">Nome Utilizador</label>
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="col-3 mb-4">
          <div>
            <label htmlFor="">Tipo do Ramal</label>
            <select
              name="tipo"
              id=""
              className="form-control"
              onChange={changeForm}
              value={form.tipo}
            >
              <option value="padrao">Padrão</option>
              <option value="softphone">Softphone</option>
              <option value="cisco">Cisco</option>
            </select>
          </div>
        </div>

        {form.tipo === "cisco" ? (
          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">MAC</label>
              <input type="text" className="form-control" />
            </div>
          </div>
        ) : null}

        <div className="col-3 mb-4">
          <div>
            <label htmlFor="">Modelo</label>
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="col-3 mb-4">
          <div>
            <label htmlFor="">Senha</label>
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="col-3 mb-4">
          <div>
            <label htmlFor="">Call-limit</label>
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="col-3 mb-4">
          <div>
            <label htmlFor="">Call Group</label>
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="col-3 mb-4">
          <div>
            <label htmlFor="">Pickup Group</label>
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="col-3 mb-4">
          <div>
            <label htmlFor="">hash</label>
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="col-3 mb-4">
          <div>
            <label htmlFor="">Ligação Externa</label>
            <div className="d-flex ">
              <div className="d-flex align-items-center mr-2">
                <label style={{ marginBottom: 0 }} className="mr-1" htmlFor="">
                  Ligado
                </label>
                <input type="radio" name="ligacaoExterna" id="" />
              </div>
              <div className="d-flex align-items-center">
                <label style={{ marginBottom: 0 }} className="mr-1">
                  Desligado
                </label>
                <input type="radio" name="ligacaoExterna" id="" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-3 mb-4">
          <div>
            <label htmlFor="">Ligação Senha</label>
            <div className="d-flex ">
              <div className="d-flex align-items-center mr-2">
                <label style={{ marginBottom: 0 }} className="mr-1" htmlFor="">
                  Ligado
                </label>
                <input type="radio" name="ligacaoSenha" id="" />
              </div>
              <div className="d-flex align-items-center">
                <label style={{ marginBottom: 0 }} className="mr-1">
                  Desligado
                </label>
                <input type="radio" name="ligacaoSenha" id="" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-3 mb-4">
          <div>
            <label htmlFor="">aGrupa</label>
            <div className="d-flex ">
              <div className="d-flex align-items-center mr-2">
                <label style={{ marginBottom: 0 }} className="mr-1" htmlFor="">
                  Ligado
                </label>
                <input type="radio" name="aGrupa" id="" />
              </div>
              <div className="d-flex align-items-center">
                <label style={{ marginBottom: 0 }} className="mr-1">
                  Desligado
                </label>
                <input type="radio" name="aGrupa" id="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FormRamal };
