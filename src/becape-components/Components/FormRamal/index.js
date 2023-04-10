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
        {tipo === "add" ? (
          <div className="col-4 ">
            <div>
              <label htmlFor="">Ramal</label>
              <input type="text" className="form-control" />
            </div>
          </div>
        ) : null}

        <div className="col-4">
          <div>
            <label htmlFor="">Nome Utilizador</label>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="col-4">
          <div>
            <label htmlFor="">Numero do ramal</label>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="col-4">
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
          <div className="col-4">
            <div>
              <label htmlFor="">MAC</label>
              <input type="text" className="form-control" />
            </div>
          </div>
        ) : null}

        <div className="col-4">
          <div>
            <label htmlFor="">Modelo</label>
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="col-4">
          <div>
            <label htmlFor="">Senha</label>
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="col-4">
          <div>
            <label htmlFor="">Call-limit</label>
            <input type="text" className="form-control" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { FormRamal };
