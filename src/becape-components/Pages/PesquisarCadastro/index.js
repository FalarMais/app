import React, { useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { BsArrowLeft } from "react-icons/bs";

import FalconCardHeader from "../../../components/common/FalconCardHeader";
import { useHistory } from "react-router-dom";
import { FormCliente } from "../../Components/CadastrarCliente";
import { useState } from "react";

const PesquisarCadastro = () => {
  const history = useHistory();
  const [dados, setDados] = useState(null);

  const fake = [
    {
      dados: {
        nome: "Andreia",
        nascimento: "1980-03-04",
        cpf: 123123123,
        telefone: 321312,
        cep: 3213123,
        bairro: "Pavuna",
        estado: "rj",
        cidade: "Marica"
      },
      historico: [
        {
          data: "2023-03-31",
          produtos: [
            {
              img:
                "https://drogariasp.vteximg.com.br/arquivos/ids/558310-1000-1000/613355---fralda-pampers-confort-sec-xg-62-unidades.jpg",
              nome: "Fralda",
              quantidade: 3,
              preco: 25
            },
            {
              img:
                "https://a-static.mlcdn.com.br/800x560/pasta-de-dente-sorriso-50g/dona/100370/5cf313873d626cf6e6bdb9c82c7cc2f9.jpg",
              nome: "Pasta",
              quantidade: 1,
              preco: 3
            }
          ]
        },

        {
          data: "2023-05-31",
          produtos: [
            {
              img:
                "https://drogariasp.vteximg.com.br/arquivos/ids/558310-1000-1000/613355---fralda-pampers-confort-sec-xg-62-unidades.jpg",
              nome: "Fralda",
              quantidade: 3,
              preco: 25
            },
            {
              img:
                "https://a-static.mlcdn.com.br/800x560/pasta-de-dente-sorriso-50g/dona/100370/5cf313873d626cf6e6bdb9c82c7cc2f9.jpg",
              nome: "Pasta",
              quantidade: 1,
              preco: 3
            }
          ]
        }
      ]
    }
  ];

  const pesquisar = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!resolve) reject("deu erro");

        resolve(setDados(fake));
      }, 1000);
    });
  };

  useEffect(() => {
    console.log(dados);
  }, [dados]);

  return (
    <Card>
      <FalconCardHeader title={`Pesquisar Cadastro`}>
        <button
          className="btn btn-outline-primary"
          onClick={() => history.goBack()}
        >
          <BsArrowLeft size={25} />
          Voltar
        </button>
      </FalconCardHeader>
      <CardBody>
        <div className="row mb-4">
          <div className="col-6">
            <input
              type="text"
              className="form-control mx-2"
              placeholder="Nome"
            />
          </div>
          <div className="col-3">
            <input
              type="number"
              className="form-control  mx-2"
              placeholder="CPF"
            />
          </div>
          <div className="col-3">
            <button
              className="btn btn-outline-success mx-2"
              onClick={() => pesquisar()}
            >
              Pesquisar
            </button>
          </div>
        </div>

        {dados ? (
          <div>
            <FormCliente />
            <div>
              <h3>Histórico de compras</h3>
              {dados[0].historico.map((historico, indicehistorico) => (
                <div key={indicehistorico}>
                  <div>{historico.data}</div>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col" />
                        <th scope="col">Produto</th>
                        <th scope="col">Preco</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historico.produtos.map((c, indiceproduto) => (
                        <tr key={indiceproduto}>
                          <td>
                            <img src={c.img} width="100" alt="" />
                          </td>
                          <td>{c.nome}</td>
                          <td>{c.preco}</td>
                          <td>{c.quantidade}</td>
                          <td>{c.preco * c.quantidade}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td>TOTAL: 250</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
};

export { PesquisarCadastro };
