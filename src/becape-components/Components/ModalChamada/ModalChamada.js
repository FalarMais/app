import React, { useState } from "react";

import { Button, Modal, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdCall, MdCallEnd } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { HiVolumeUp } from "react-icons/hi";

import "./modal.css";
import song from "./song.mp3";

const ModalChamada = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      className={`mt-6 modal-css`}
      contentClassName="border-0"
      modalClassName="theme-modal"
      backdrop={false}
      style={{ boxShadow: "33px 32px 32px -3px rgba(0,0,0,0.1)" }}
      size="sm"
    >
      <ModalBody className="p-0">
        <div className="position-absolute t-0 r-0  z-index-1">
          <Button
            size="sm"
            className="close close-circle d-flex flex-center transition-base mt-3 mr-3"
            style={{ backgroundColor: "#fff" }}
            onClick={() => toggle()}
          >
            <FontAwesomeIcon icon="times" transform="shrink-6 right-0.3 down-0.3" />
          </Button>
        </div>
        <audio id="audio" loop autoplay="true">
          <source src={song} type="audio/mpeg" />
        </audio>
        <div
          className="rounded-soft-top px-4 py-3"
          style={{ backgroundColor: "#6E00B0" }}
        >
          <div className="d-flex flex-column justify-content-center">
            <span className="text-center text-white">DESCONHECIDO</span>
            <span className="text-center text-white fw-bold fs-3 font-weight-bold">
              0175750007
            </span>
          </div>
        </div>

        <div className="my-5 d-flex justify-content-center" style={{ minHeight: 300 }}>
          <button
            className="bg-success mx-4 d-flex justify-content-center align-items-center"
            style={{ width: 60, height: 60, borderRadius: 30, border: 0 }}
          >
            <MdCall size={40} color="#fff" />
          </button>

          <button
            className="bg-danger mx-4 d-flex justify-content-center align-items-center"
            style={{ width: 60, height: 60, borderRadius: 30, border: 0 }}
          >
            <MdCallEnd size={40} color="#fff" />
          </button>

          <div className="position-absolute r-0  z-index-1" style={{ bottom: 50 }}>
            <Button
              size="sm"
              className="close close-circle d-flex flex-center transition-base mt-3 mr-3"
              onClick={() => toggle()}
            >
              <FaMicrophone size={20} color="#000" />
            </Button>
          </div>

          <div className="position-absolute r-0  z-index-1" style={{ bottom: 100 }}>
            <Button
              size="sm"
              className="close close-circle d-flex flex-center transition-base mt-3 mr-3"
              onClick={() => toggle()}
            >
              <HiVolumeUp size={20} color="#000" />
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export { ModalChamada };
