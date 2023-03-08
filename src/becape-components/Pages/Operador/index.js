import React from "react";
import { registrarRotas } from "../../../routes";
import { EmChamada } from "../../Components/EmChamada";
import { FilaChamadas } from "../../Components/FilaChamadas";
import { TabelaChamados } from "../../Components/TabelaChamados";
import { Historico } from "../Historico";

const Operador = () => {
  return (
    <div className="row">
      <div className="col-12 col-md-9">
        <EmChamada />
        <Historico />
      </div>
      <div className="col-12 col-md-3">
        <FilaChamadas />
      </div>
    </div>
  );
};

export { Operador };
