import React from "react";
import { EmChamada } from "../../../Components/EmChamada";
import { FilaChamadas } from "../../../Components/FilaChamadas";
import { Historico } from "../../Historico";

const Hospital = () => {
  return (
    <div className="row">
      <div className="col-12 col-md-9">
        <EmChamada tipo="hospital" />
        <Historico />
      </div>
      <div className="col-12 col-md-3">
        <FilaChamadas />
      </div>
    </div>
  );
};

export { Hospital };
