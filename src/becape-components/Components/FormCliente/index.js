import React, { Fragment, useEffect, useState } from "react";
import { useApiRequest } from "../../hooks/useApiRequest";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { revalidarForm, validarForm } from "../../utils/validarForm";

const vazio = {
  id: "",
  razaoSocial: "",
  nomeFantasia: "",
  cnpj: "",
  endereco: {
    id: "",
    cep: "",
    numero: "",
    complemento: ""
  },
  contato: {
    id: "",
    telefone: "",
    email: ""
  },
  habilitado: true,
  tipoUsuario: 1
};
const FormCliente = ({ tipo, data, clientes, setClientes }) => {
  const { doRequest } = useApiRequest();
  const [clienteSelecionado, setClienteSelecionado] = useState(
    data ? data : vazio
  );

  useEffect(() => {
    if (data) {
      setClienteSelecionado(data);
    }
  }, [data]);

  function handleForm(event) {
    const { name, value } = event.target;
    const [parentKey, childKey] = name.split(".");

    setClienteSelecionado({
      ...clienteSelecionado,
      [parentKey]: {
        ...clienteSelecionado[parentKey],
        [childKey]: value
      }
    });
    console.log(clienteSelecionado);
  }

  function handleFormNormal(event) {
    const { name, value } = event.target;
    setClienteSelecionado({ ...clienteSelecionado, [name]: value });
  }

  const atualizarEnderecoCliente = async () => {
    const dataEndereco = {
      id: clienteSelecionado.id,
      cep: clienteSelecionado.endereco.cep,
      numero: clienteSelecionado.endereco.numero,
      complemento: clienteSelecionado.endereco.complemento
    };

    const dataContato = {
      id: clienteSelecionado.id,
      telefone: clienteSelecionado.contato.telefone,
      email: clienteSelecionado.contato.email
    };

    try {
      const responseEndereco = await doRequest(
        "put",
        `Cliente/${clienteSelecionado.id}/endereco`,
        dataEndereco
      );

      const responseContato = await doRequest(
        "put",
        `Cliente/${clienteSelecionado.id}/contato`,
        dataContato
      );

      const clienteAtualizado =
        responseEndereco.status === 202 && responseContato.status === 202;
      if (clienteAtualizado) {
        toast("Cliente atualizado com sucesso!");

        const clientesFiltrados = clientes.filter(
          c => c.id !== clienteSelecionado.id
        );
        setClientes([...clientesFiltrados, clienteSelecionado]);
        revalidarForm("form-cliente");
      } else {
        toast.error("Não foi possível atualizar Cliente");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const adicionarCliente = async () => {
    const data = {
      ...clienteSelecionado,
      id: v4()
    };
    data.endereco.id = v4();
    data.contato.id = v4();
    const response = await doRequest("post", `Cliente`, data);
    console.log(response);
    if (response.status === 201) {
      revalidarForm("form-cliente");
      setClienteSelecionado(vazio);
      setClientes([...clientes, clienteSelecionado]);
    } else {
      toast(String(response.error));
    }
  };

  return (
    <div className="my-3">
      <form className="needs-validation form-cliente" noValidate>
        <div className="row">
          {tipo === "adicionar" ? (
            <Fragment>
              <div className="col-3 d-flex flex-column mb-2">
                <div>
                  <label className="mb-0" htmlFor="">
                    Razão Fantasia
                  </label>
                  <input
                    required
                    className="form-control"
                    onChange={e => handleFormNormal(e)}
                    name="razaoSocial"
                    value={clienteSelecionado.razaoSocial}
                  />
                  <div className="invalid-feedback">
                    Forneça a razão social.
                  </div>
                </div>
              </div>
              <div className="col-3 d-flex flex-column mb-2">
                <div>
                  <label className="mb-0" htmlFor="">
                    Nome Fantasia
                  </label>
                  <input
                    required
                    className="form-control"
                    onChange={e => handleFormNormal(e)}
                    name="nomeFantasia"
                    value={clienteSelecionado.nomeFantasia}
                  />
                  <div className="invalid-feedback">
                    Forneça o nome fantasia.
                  </div>
                </div>
              </div>
              <div className="col-3 d-flex flex-column mb-2">
                <div>
                  <label className="mb-0" htmlFor="">
                    CNPJ
                  </label>
                  <input
                    required
                    className="form-control"
                    onChange={e => handleFormNormal(e)}
                    name="cnpj"
                    value={clienteSelecionado.cnpj}
                  />
                  <div className="invalid-feedback">
                    Forneça um número do CNPJ.
                  </div>
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="col-3 d-flex flex-column mb-2">
                <label className="mb-0" htmlFor="">
                  Razão Social
                </label>
                <span>{clienteSelecionado.razaoSocial}</span>
              </div>
              <div className="col-3 d-flex flex-column mb-2">
                <label className="mb-0" htmlFor="">
                  Nome Fantasia
                </label>
                <span>{clienteSelecionado.nomeFantasia}</span>
              </div>

              <div className="col-3 d-flex flex-column mb-2">
                <label className="mb-0" htmlFor="">
                  CNPJ
                </label>
                <span>{clienteSelecionado.cnpj}</span>
              </div>

              <div className="col-3 d-flex flex-column mb-2">
                <label className="mb-0" htmlFor="">
                  Habilitado
                </label>
                <span>{String(clienteSelecionado.habilitado)}</span>
              </div>
            </Fragment>
          )}

          <div className="col-3 d-flex flex-column mb-2">
            <div>
              <label className="mb-0" htmlFor="">
                CEP
              </label>
              <input
                required
                className="form-control"
                onChange={e => handleForm(e)}
                name="endereco.cep"
                type="number"
                value={clienteSelecionado.endereco.cep}
              />
              <div className="invalid-feedback">Forneça um número de CEP.</div>
            </div>
          </div>

          <div className="col-3 d-flex flex-column mb-2">
            <div>
              <label className="mb-0" htmlFor="">
                NÚMERO
              </label>
              <input
                required
                className="form-control"
                onChange={e => handleForm(e)}
                name="endereco.numero"
                type="number"
                value={clienteSelecionado.endereco.numero}
              />
              <div className="invalid-feedback">Forneça um número.</div>
            </div>
          </div>

          <div className="col-3 d-flex flex-column mb-2">
            <div>
              <label className="mb-0" htmlFor="">
                COMPLEMENTO
              </label>
              <input
                required
                className="form-control"
                onChange={e => handleForm(e)}
                name="endereco.complemento"
                value={String(clienteSelecionado.endereco.complemento)}
              />
              <div className="invalid-feedback">Forneça o complemento.</div>
            </div>
          </div>

          <div className="col-3 d-flex flex-column mb-2">
            <div>
              <label className="mb-0" htmlFor="">
                TELEFONE
              </label>
              <input
                required
                className="form-control"
                onChange={e => handleForm(e)}
                name="contato.telefone"
                value={clienteSelecionado.contato.telefone}
              />
              <div className="invalid-feedback">
                Forneça um número de telefone.
              </div>
            </div>
          </div>

          <div className="col-3 d-flex flex-column mb-2">
            <div>
              <label className="mb-0" htmlFor="">
                EMAIL
              </label>
              <input
                required
                className="form-control"
                type="email"
                onChange={e => handleForm(e)}
                name="contato.email"
                value={clienteSelecionado.contato.email}
              />
              <div className="invalid-feedback">
                Forneça um endereço de email.
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn btn-falar my-2"
          type="submit"
          onClick={e =>
            validarForm(
              e,
              () =>
                tipo === "adicionar"
                  ? adicionarCliente()
                  : atualizarEnderecoCliente(),
              "form-cliente"
            )
          }
        >
          {tipo === "adicionar" ? "Criar" : "Atualizar"} cliente
        </button>
      </form>
    </div>
  );
};

export { FormCliente };
