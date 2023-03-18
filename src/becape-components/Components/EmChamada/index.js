import React, { useState } from "react";

const chamadaOBJ1 = {
  id: 0,
  nome: "Ana Pereira da Costa",
  cpf: "168.555.807-00",
  telefone: "4002-8922",
  endereco: "Estada velha n° 42"
};

const chamadaOBJ2 = {
  id: 1,
  nome: "Desconhecido",
  cpf: null,
  telefone: "0000-0000",
  endereco: ""
};

const Perfil = ({ perfil }) => {
  const produtos = [
    {
      nome: "Loratamed",
      img: "https://imgs.ponto.com.br/1523906528/1xg.jpg",
      preco: "R$5,00"
    },
    {
      nome: "Loratamed",
      img: "https://imgs.ponto.com.br/1523906528/1xg.jpg",
      preco: "R$5,00"
    },
    {
      nome: "Loratamed",
      img: "https://imgs.ponto.com.br/1523906528/1xg.jpg",
      preco: "R$5,00"
    },
    {
      nome: "Loratamed",
      img: "https://imgs.ponto.com.br/1523906528/1xg.jpg",
      preco: "R$5,00"
    }
  ];
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3>{perfil.nome}</h3>
        <h4>CPF: {perfil.cpf}</h4>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-5">
        <div>
          <span className="mr-2">42 anos</span>
          <span>Telefone: {perfil.telefone}</span>
        </div>
        <span>Endereço: {perfil.endereco}</span>
      </div>

      <div>
        <h5 className="mb-3">Produtos Recomendados</h5>
        <div className="row">
          {produtos.map(p => (
            <div className="col-3">
              <div className="d-flex flex-column">
                <img width="100" src={p.img} alt="" />
                <span>{p.nome}</span>
                <span>{p.preco}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CadastrarCliente = ({ chamada }) => {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3>Desconhecido</h3>
        <h4>Telefone: {chamada.telefone}</h4>
      </div>

      <CadastrarCliente telefone={chamada.telefone} />
      <button className="btn btn-success">Cadastrar</button>
    </div>
  );
};
const EmChamada = () => {
  const [chamada, setChamada] = useState(chamadaOBJ1);

  return (
    <div className="bg-light rounded p-3 mb-5">
      <button
        onClick={() => {
          chamada.id === 0 ? setChamada(chamadaOBJ2) : setChamada(chamadaOBJ1);
        }}
      >
        Trocar
      </button>
      {chamada.cpf ? (
        <Perfil perfil={chamada} />
      ) : (
        <CadastrarCliente chamada={chamada} />
      )}
    </div>
  );
};

export { EmChamada };
