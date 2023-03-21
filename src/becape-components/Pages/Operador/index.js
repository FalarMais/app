import React from "react";
import { EmChamada } from "../../Components/EmChamada";
import { FilaChamadas } from "../../Components/FilaChamadas";
import { Historico } from "../Historico";

const Operador = () => {
  return (
    <div className="row">
      <div className="col-12 col-md-9">
        <EmChamada />
        <Historico />
      </div>
      <div className="col-12 col-md-3">
        {/* <TabelaChamados /> */}
        <FilaChamadas />
      </div>
    </div>
  );
};

export { Operador };
