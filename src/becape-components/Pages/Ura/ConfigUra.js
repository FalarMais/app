import React, { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import FalconCardHeader from "../../../components/common/FalconCardHeader";
import { useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { ModalAudios } from "./ModalAudios";
import { MdDelete } from "react-icons/md";

const ConfigUra = () => {
  const [audios, setAudios] = useState([]);
  const [atendedor, setAtendedor] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);

  const [formURA, setFormURA] = useState({
    audioId: "28b5c2b9-a972-4451-b788-905cb392a257",
    textoUra: "TEXTOURADEFAULT",
    audioOuTexto: false,
    maxEsperaOpcao: 0,
    maxTentativas: 0,
    idAudioErro: "68cd6d4b-e9e8-485b-866f-8e507401f74b",
    textoErro: "TEXTOERRODEFAULT",
    audioOuTextoErro: false,
    idAtendedorErro: "",
    discagemDireta: false,
    discarAntesTermino: false,
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa7"
  });

  useEffect(() => {
    (async () => {
      const { data: audios } = await api.get("/audios");
      // const { data: atendedor } = await api.get("/fila-atendimento");

      setAudios(audios);
      setAtendedor(atendedor);
    })();

    // eslint-disable-next-line
  }, []);

  const history = useHistory();

  function salvar() {
    switch (true) {
      case formURA.audioOuTexto &&
        formURA.audioId === "" &&
        formURA.audioOuTextoErro &&
        formURA.idAudioErro === "":
        return toast.info("Selecione os dois áudios para continuar.");
      case formURA.audioOuTexto && formURA.audioId === "":
        return toast.info("Selecione um áudio.");
      case formURA.audioOuTextoErro && formURA.idAudioErro === "":
        return toast.info("Selecione um áudio para erro.");
      default:
        return console.log(formURA);
    }
  }

  function handleForm(event) {
    const { name, value } = event.target;
    console.log(event.target.value);
    console.log(event.target.name);
    setFormURA({ ...formURA, [name]: value });
  }

  const excluirAudio = () => {};
  return (
    <Card>
      <FalconCardHeader title={`URA`} titleClass="text-falar">
        <button
          className="btn btn-outline-falar"
          onClick={() => history.goBack()}
        >
          <BsArrowLeft size={25} />
          Voltar
        </button>
      </FalconCardHeader>
      <CardBody>
        <ModalAudios abrirModal={abrirModal} />
        <div className="border rounded p-2 mb-4">
          <div className="d-flex justify-content-between">
            <h5>Audios</h5>
            <button
              className="btn btn-sm btn-falar"
              onClick={() => setAbrirModal(!abrirModal)}
            >
              add
            </button>
          </div>
          {audios.map((audio, indice) => (
            <div key={indice}>
              <label>{audio.nomeArquivo}</label>
              <MdDelete
                size={15}
                color="red"
                onClick={() => excluirAudio(audio.id)}
              />
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Audio/Texto:</label>
              <div className="d-flex ">
                <div className="d-flex align-items-center mr-2">
                  <label
                    style={{ marginBottom: 0 }}
                    className="mr-1"
                    htmlFor=""
                  >
                    Ligado
                  </label>
                  <input
                    onChange={() => {
                      setFormURA({ ...formURA, audioOuTexto: true });
                    }}
                    checked={formURA.audioOuTexto === true && true}
                    type="radio"
                    name="audioTexto"
                    id=""
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label style={{ marginBottom: 0 }} className="mr-1">
                    Desligado
                  </label>
                  <input
                    checked={formURA.audioOuTexto === false && true}
                    onChange={() => {
                      setFormURA({ ...formURA, audioOuTexto: false });
                    }}
                    type="radio"
                    name="audioTexto"
                    id=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Audio/Texto Erro:</label>
              <div className="d-flex ">
                <div className="d-flex align-items-center mr-2">
                  <label
                    style={{ marginBottom: 0 }}
                    className="mr-1"
                    htmlFor=""
                  >
                    Ligado
                  </label>
                  <input
                    onChange={() => {
                      setFormURA({ ...formURA, audioOuTextoErro: true });
                    }}
                    checked={formURA.audioOuTextoErro === true && true}
                    type="radio"
                    name="audioTextoErro"
                    id=""
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label style={{ marginBottom: 0 }} className="mr-1">
                    Desligado
                  </label>
                  <input
                    onChange={() => {
                      setFormURA({ ...formURA, audioOuTextoErro: false });
                    }}
                    checked={formURA.audioOuTextoErro === false && true}
                    type="radio"
                    name="audioTextoErro"
                    id=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Discagem Direta:</label>
              <div className="d-flex ">
                <div className="d-flex align-items-center mr-2">
                  <label
                    style={{ marginBottom: 0 }}
                    className="mr-1"
                    htmlFor=""
                  >
                    Ligado
                  </label>
                  <input
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
                    Desligado
                  </label>
                  <input
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

          <div className="col-3 mb-4">
            <div>
              <label htmlFor="">Discar Antes Termino:</label>
              <div className="d-flex ">
                <div className="d-flex align-items-center mr-2">
                  <label
                    style={{ marginBottom: 0 }}
                    className="mr-1"
                    htmlFor=""
                  >
                    Ligado
                  </label>
                  <input
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
                    Desligado
                  </label>
                  <input
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

          <div className="col-6 mb-4">
            <div>
              <label htmlFor="">Audio</label>
              <select
                type="text"
                className="form-control"
                disabled={formURA.audioOuTexto ? false : true}
                onChange={e => handleForm(e)}
                name="audioId"
                value={formURA.audioId}
              >
                <option value="" />

                {audios.map((audio, indice) => (
                  <option key={indice} value={audio.id}>{`${
                    audio.nomeArquivo
                  }`}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-6 mb-4">
            <div>
              <label htmlFor="">Audio Error</label>
              <select
                type="text"
                className="form-control"
                disabled={formURA.audioOuTextoErro ? false : true}
                onChange={e => handleForm(e)}
                name="idAudioErro"
                value={formURA.idAudioErro}
              >
                <option value="" />

                {audios.map((audio, indice) => (
                  <option key={indice} value={audio.id}>{`${
                    audio.nomeArquivo
                  }`}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-6 mb-4">
            <div>
              <label htmlFor="">Texto URA</label>
              <textarea
                type="text"
                className="form-control"
                disabled={formURA.audioOuTexto ? true : false}
                onChange={e => handleForm(e)}
                value={formURA.textoUra}
                name="textoUra"
              />
            </div>
          </div>
          <div className="col-6 mb-4">
            <div>
              <label htmlFor="">Texto Erro</label>
              <textarea
                type="text"
                className="form-control"
                disabled={formURA.audioOuTextoErro ? true : false}
                onChange={e => handleForm(e)}
                value={formURA.textoErro}
                name="textoErro"
              />
            </div>
          </div>

          <div className="col-4 mb-4">
            <div>
              <label htmlFor="">Atendedor Padrão:</label>
              <select
                type="text"
                className="form-control"
                onChange={e => handleForm(e)}
                name="idAtendedorErro"
                value={formURA.idAtendedorErro}
              >
                <option value="" />
                {atendedor.map(a => (
                  <option value={a.id}>{`${a.nome}`}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-4">
            <div>
              <label htmlFor="">Máx. Espera Opção</label>
              <input
                onChange={e => handleForm(e)}
                name="maxEsperaOpcao"
                className="form-control"
                type="number"
                value={formURA.maxEsperaOpcao}
              />
            </div>
          </div>
          <div className="col-4">
            <div>
              <label htmlFor="">Máx. Tentativas</label>
              <input
                className="form-control"
                onChange={e => handleForm(e)}
                name="maxTentativas"
                type="number"
                value={formURA.maxTentativas}
              />
            </div>
          </div>
        </div>

        <button className="my-3 btn btn-falar" onClick={() => salvar()}>
          Salvar
        </button>
      </CardBody>
    </Card>
  );
};

export { ConfigUra };
