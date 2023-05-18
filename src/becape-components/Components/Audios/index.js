import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { api } from "../../services/api";

const Audios = ({ audios, setAudios, setAbrirModal, abrirModal }) => {
  const [audioSelecionado, setAudioSelecionado] = useState(null);

  const excluirAudio = async id => {
    const verificarSolicitacao = window.confirm(
      `Deseja excluir o áudio ${id}?`
    );

    if (verificarSolicitacao) {
      try {
        await api.delete(`/audios/${id}`);
        setAudios(audios => audios.filter(a => a.id !== id));
      } catch (err) {}
    }
  };

  return (
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
          <button className="btn">
            <FaPlay
              size={20}
              color="green"
              onClick={() => setAudioSelecionado(audio)}
            />
          </button>

          <button className="btn ">
            <MdDelete
              size={25}
              color="red"
              onClick={() => excluirAudio(audio.id)}
            />
          </button>
        </div>
      ))}

      {audioSelecionado ? (
        <div className="my-2 d-flex flex-column" style={{ width: 300 }}>
          <span className="text-center">{audioSelecionado.nomeArquivo}</span>
          <audio controls>
            <source
              src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_MP3.mp3"
              type="audio/mpeg"
            />
          </audio>
        </div>
      ) : null}
    </div>
  );
};

export { Audios };
