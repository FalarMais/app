import {
  Modal,
  ModalHeader,
  ModalBody
  // ModalFooter,
} from "reactstrap";
import React, { useEffect } from "react";
import { useState } from "react";
import { api } from "../../services/api";

var a;
const ModalAudios = ({ abrirModal }) => {
  const [buttonName, setButtonName] = useState("Play");
  const [audio, setAudio] = useState({ preview: null, enviar: null });

  useEffect(() => {
    if (a) {
      a.pause();
      a = null;
      setButtonName("Play");
    }
    if (audio) {
      a = new Audio(audio.preview);
      a.onended = () => {
        setButtonName("Play");
      };
    }
  }, [audio]);

  const handleClick = () => {
    if (buttonName === "Play") {
      a.play();
      setButtonName("Pause");
    } else {
      a.pause();
      setButtonName("Play");
    }
  };

  const uparAudio = e => {
    const audio = e.target.files[0];
    if (audio) {
      console.log(audio);
      setAudio({ preview: URL.createObjectURL(audio), enviar: audio });
    }
  };

  const enviarAudio = async e => {
    const formData = new FormData();
    formData.append("audio", audio.enviar);

    try {
      const response = await api.post("/audios", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal isOpen={abrirModal} style={{ overflow: "auto" }}>
      <ModalHeader>Adicionar Audio</ModalHeader>
      <ModalBody>
        <input className="mb-4" type="file" onChange={uparAudio} />
        <button className="form-control mb-4" onClick={handleClick}>
          {buttonName}
        </button>

        <div className="mb-4">
          <label htmlFor="">Descrição</label>
          <input type="text" className="form-control" />
        </div>
        <button className="form-control mb-4" onClick={() => enviarAudio()}>
          Enviar
        </button>
      </ModalBody>
    </Modal>
  );
};

export { ModalAudios };
