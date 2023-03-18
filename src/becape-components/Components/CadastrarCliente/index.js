import React from "react";

export const FormCliente = ({ telefone }) => {
  return (
    <div className="d-flex flex-column">
      <div className="row mb-4">
        <div className="col-7">
          <div className="d-flex">
            <span className="mr-3">Nome:</span>
            <input className="form-control" type="text" />
          </div>
        </div>

        <div className="col-5">
          <div className="d-flex">
            <span className="mr-3">Nascimento:</span>
            <input className="form-control" type="date" />
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-6">
          <div className="d-flex">
            <span className="mr-3">CPF:</span>
            <input className="form-control" type="text" />
          </div>
        </div>

        <div className="col-6">
          <div className="d-flex">
            <span className="mr-3">Telefone:</span>
            <input
              className="form-control"
              type="text"
              value={telefone ? telefone : ""}
            />
          </div>
        </div>
      </div>

      <div className="d-flex mb-4">
        <span className="mr-3">CEP:</span>
        <input className="form-control" type="text" />
      </div>

      <div className="d-flex mb-4">
        <span className="mr-3">Endereço:</span>
        <input className="form-control" type="text" />
      </div>

      <div className="d-flex mb-4">
        <span className="mr-3">Bairro:</span>
        <input className="form-control" type="text" />
      </div>

      <div className="d-flex mb-4">
        <span className="mr-3">Estado:</span>
        <select className="form-control" type="text">
          <option value="">RJ</option>
        </select>
      </div>

      <div className="d-flex mb-4">
        <span className="mr-3">Cidade:</span>
        <input className="form-control" type="text" />
      </div>
    </div>
  );
};
const FormCadastrarCliente = ({ telefone }) => {
  return (
    <>
      <h5 className="mb-3">Cadastar Cliente</h5>
      <FormCliente telefone={telefone} />
      <button className="btn btn-success" style={{ width: 120 }}>
        Cadastar
      </button>
    </>
  );
};

export { FormCadastrarCliente };
