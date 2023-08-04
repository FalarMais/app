import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { FcDownload } from "react-icons/fc";
import { useInicializarTabela } from "../../hooks/useInicializarTabela";

import "./tabela.css";
import { useApiRequest } from "../../hooks/useApiRequest";
import audioFile from "./audio.mp3";
import moment from "moment";
import { verificarDatas } from "../../utils/setarHorarios";
/*
import {
  calcularMinutosSegundos,
  setarHorarios,
  verificarDatas
} from "../../utils/setarHorarios";
*/
const TabelaChamados = ({ tipo, dataChamadas, setDataChamadas, isLoading }) => {
  const [data, setData] = useState([]);

  useInicializarTabela(data);
  const { doRequest } = useApiRequest();
  useEffect(() => {
    window
      .$("#example")
      .DataTable()
      .destroy();

    if (dataChamadas.content) {
      const chamadasOrdenadas = [...dataChamadas.content].sort(
        (a, b) =>
          new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime()
      );

      setData(chamadasOrdenadas);
    }
  }, [dataChamadas]);

  useEffect(() => {
    if (!isLoading && !dataChamadas.content) {
      const vazio = {
        codigo: "-",
        origemChamda: "-",
        destinoChamada: "-",
        status: "",
        horaInicio: "-",
        horaAtendimento: "-",
        horaFim: "-"
      };

      setData([vazio]);
    }
  }, [isLoading, dataChamadas.content]);

  function verificarStatus(status) {
    switch (status) {
      case 1:
        return "PERDIDA";
      case 2:
        return "ATENDIDA";
      case 3:
        return "Respondida";
      case 4:
        return "Ocupada";
      case 5:
        return "Sem resposta";
      case 6:
        return "Falha";
      default:
        return "";
    }
  }

  const excluirChamada = async id => {
    const verificarSolicitacao = window.confirm(
      `Deseja excluir a chamada ${id}?`
    );

    if (verificarSolicitacao) {
      try {
        await doRequest("delete", `/chamada/${id}`);
        const contentFiltrado = dataChamadas.content.filter(a => a.id !== id);

        setDataChamadas({ ...dataChamadas, content: contentFiltrado });
      } catch (err) {}
    }
  };

  const verificarDuracaoChamada = data => {
    const existeCamposNulos = verificarDatas(data.dataInicio, data.horaFim);
    if (existeCamposNulos) {
      return "-";
    }

    const dataInicio = new Date(data.dataInicio);
    const horaFim = new Date(
      moment(data.horaFim).format("YYYY-MM-DDTHH:mm:ss")
    );

    const duracaoEmSegundos = (horaFim.getTime() - dataInicio.getTime()) / 1000;
    const duracaoEmMinutos = Math.floor(duracaoEmSegundos / 60);
    const duracaoEmSegundosRestantes = duracaoEmSegundos % 60;

    if (duracaoEmMinutos === 0) {
      return `${duracaoEmSegundosRestantes}s`;
    } else {
      return `${duracaoEmMinutos}m ${duracaoEmSegundosRestantes} s`;
    }
  };

  const abrirGravacao = async id => {
    const audioEmBinario = await converterBinario();
    const blob = new Blob([audioEmBinario], { type: "audio/mp3" });
    const url = URL.createObjectURL(blob);

    const audioPlay = new Audio(url);
    audioPlay.controls = true;
    audioPlay.id = id;

    const containerAudio = window.$("#container-audio");
    const audioAtual = window.$("#container-audio > audio");
    console.log(audioAtual);
    if (audioAtual.length > 0) {
      const comparandoId = audioAtual[0].id === id;
      console.log(comparandoId);
      if (comparandoId) {
        containerAudio.empty();
      } else {
        containerAudio.html(audioPlay);
        audioPlay.play();
      }
    } else {
      containerAudio.html(audioPlay);
      audioPlay.play();
    }
  };
  const baixarArquivo = async id => {
    const audioEmBinario = await converterBinario(id);
    if (audioEmBinario) {
      const blob = new Blob([audioEmBinario], { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);
      const element = document.createElement("a");
      element.setAttribute("href", url);
      element.setAttribute("download", "audio.mp3");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const converterBinario = async tipo => {
    /*const { content } = await doRequest(
      "get",
      `/chamada/${idChamada}/gravacoes`
    );
    console.log(content); */
    const response = await fetch(audioFile);
    const blob = await response.blob();
    const reader = new FileReader();

    let binarioAudio = "";

    reader.readAsArrayBuffer(blob);

    await new Promise((resolve, reject) => {
      reader.onload = async () => {
        binarioAudio = new Uint8Array(reader.result);
        resolve();
      };
    });

    return binarioAudio;
  };

  return (
    <div style={{ minHeight: 500 }}>
      {data.length > 0 ? (
        <table id="example" className="display" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Situação</th>
              <th>Origem</th>
              <th>Destino</th>
              <th>Dia</th>
              <th>H.Ínicio</th>
              <th>H.Fim</th>
              <th>D.Chamada</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{verificarStatus(d.status)}</td>
                <td>{d.origemChamada}</td>
                <td>{d.destinoChamada}</td>
                <td>{moment(d.dataInicio).format("DD/MM")}</td>
                <td>{moment(d.dataInicio).format("HH:mm:ss")}</td>
                <td>{moment(d.horaFim).format("HH:mm:ss")}</td>
                <td> {verificarDuracaoChamada(d)}</td>
                <td>
                  {d.id ? (
                    <div className="d-flex">
                      <button
                        className="btn mr-2"
                        onClick={() => abrirGravacao(d.id)}
                      >
                        <FaPlay color="#2cb72c" size={20} />
                      </button>
                      <button
                        className="btn"
                        onClick={() => baixarArquivo(d.id)}
                      >
                        <FcDownload size={24} />
                      </button>
                      <button
                        className="btn"
                        onClick={() => excluirChamada(d.id)}
                      >
                        <MdDelete color="#EE565D" size={24} />
                      </button>
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>CARREGANDO</h1>
      )}

      <div id="container-audio">
        <span />
      </div>
    </div>
  );
};

export { TabelaChamados };
