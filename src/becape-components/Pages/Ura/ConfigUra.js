import React, { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import FalconCardHeader from "../../../components/common/FalconCardHeader";
import { useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { ModalAudios } from "./ModalAudios";

import { Audios } from "../../Components/Audios";
import { validarForm } from "../../utils/validarForm";

const ConfigUra = () => {
  const [audios, setAudios] = useState([]);
  const [atendedor, setAtendedor] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);

  const [formURA, setFormURA] = useState({
    audioId: "28b5c2b9-a972-4451-b788-905cb392a257",
    textoUra: "TEXTOURADEFAULT",
    audioOuTexto: false,
    maxEsperaOpcao: "",
    maxTentativas: "",
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

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    // var forms = document.getElementsByClassName("needs-validation");
    // var validation = Array.prototype.filter.call(forms, function(form) {
    //   form.addEventListener(
    //     "submit",
    //     function(event) {
    //       event.preventDefault();

    //       if (form.checkValidity() === false) {
    //         event.stopPropagation();
    //       } else {
    //         salvar();
    //       }

    //       form.classList.add("was-validated");
    //     },
    //     false
    //   );
    // });
    validarForm(salvar);
    // eslint-disable-next-line
  }, []);

  const history = useHistory();

  function salvar(e) {
    switch (true) {
      case formURA.audioOuTexto &&
        formURA.audioId === "" &&
        formURA.audioOuTextoErro &&
        formURA.idAudioErro === "":
        return toast.info("Selecione os dois áudios.");
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
        <ModalAudios abrirModal={abrirModal} setAbrirModal={setAbrirModal} />
        <Audios
          audios={audios}
          setAudios={setAudios}
          abrirModal={abrirModal}
          setAbrirModal={setAbrirModal}
        />
        <form class="needs-validation" noValidate>
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
                      required
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
                      required
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
                      required
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
                      required
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
                      Desligado
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
                      Desligado
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

            <div className="col-6 mb-4">
              <div>
                <label htmlFor="">Audio</label>
                <select
                  required
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
                <div className="invalid-feedback">Forneça um áudio.</div>
              </div>
            </div>
            <div className="col-6 mb-4">
              <div>
                <label htmlFor="">Audio Error</label>
                <select
                  required
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
                <div className="invalid-feedback">Forneça um áudio.</div>
              </div>
            </div>

            <div className="col-6 mb-4">
              <div>
                <label htmlFor="">Texto URA</label>
                <textarea
                  required
                  type="text"
                  className="form-control"
                  disabled={formURA.audioOuTexto ? true : false}
                  onChange={e => handleForm(e)}
                  value={formURA.textoUra}
                  name="textoUra"
                />
                <div className="invalid-feedback">
                  Forneça um texto para URA
                </div>
              </div>
            </div>
            <div className="col-6 mb-4">
              <div>
                <label htmlFor="">Texto Erro</label>
                <textarea
                  required
                  type="text"
                  className="form-control"
                  disabled={formURA.audioOuTextoErro ? true : false}
                  onChange={e => handleForm(e)}
                  value={formURA.textoErro}
                  name="textoErro"
                />
                <div className="invalid-feedback">
                  Forneça um texto para o erro.
                </div>
              </div>
            </div>

            <div className="col-4 mb-4">
              <div>
                <label htmlFor="">Atendedor Padrão:</label>
                <select
                  required
                  type="text"
                  className="form-control"
                  onChange={e => handleForm(e)}
                  name="idAtendedorErro"
                  value={formURA.idAtendedorErro}
                >
                  <option value="" />

                  <option value="1" />
                  {atendedor.map(a => (
                    <option value={a.id}>{`${a.nome}`}</option>
                  ))}
                </select>
                <div className="invalid-feedback">
                  Selecione um numero Atendedor Padrão.
                </div>
              </div>
            </div>

            <div className="col-4">
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
            <div className="col-4">
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
                {/* <ValidarCampo data={formURA.maxTentativas} /> */}
              </div>
            </div>
          </div>

          <button className="my-3 btn btn-falar" type="submit">
            Salvar
          </button>
        </form>
      </CardBody>
    </Card>
  );
};

export { ConfigUra };
