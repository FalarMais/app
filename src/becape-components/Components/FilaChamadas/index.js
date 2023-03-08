import React from "react";
import { MdCall } from "react-icons/md";

const FilaChamadas = () => {
    const fila = [
        {
            nome: "Ana",
            ligadoEm: "16:00",
            esperandoEm: "00:35",
            numero: "(21)9876-9876"
        },

        {
            nome: "Ana",
            ligadoEm: "16:00",
            esperandoEm: "00:35",
            numero: "(21)9876-9876"
        },
        {
            nome: "Ana",
            ligadoEm: "16:00",
            esperandoEm: "00:35",
            numero: "(21)9876-9876"
        },
        {
            nome: "Ana",
            ligadoEm: "16:00",
            esperandoEm: "00:35",
            numero: "(21)9876-9876"
        },
        {
            nome: "Ana",
            ligadoEm: "16:00",
            esperandoEm: "00:35",
            numero: "(21)9876-9876"
        }
    ];
    return (
        <div className="p-3 bg-light rounded d-flex flex-column">
            <h5 className="mb-3">Chamadas em fila - 5</h5>

            <div className="d-flex align-items-center">
                <input type="checkbox" name="" id="" />
                <label class="p-0 m-0 mx-1" htmlFor="">
                    Atender Automaticamente
                </label>
            </div>

            <div>
                {fila.map(f => (
                    <div
                        className="p-2 px-4 my-3 rounded position-relative"
                        style={{ backgroundColor: "#edf2f9" }}
                    >
                        <div className="d-flex mb-2 align-items-center justify-content-between">
                            <span>{f.nome}</span>
                            <span>{`${f.ligadoEm}/${f.esperandoEm}`}</span>
                        </div>
                        <span className="d-block text-right">{f.numero}</span>
                        <div
                            className="position-absolute"
                            style={{ left: -10, top: 25 }}
                        >
                            <button
                                className="bg-success d-flex justify-content-center align-items-center"
                                style={{
                                    width: 35,
                                    height: 35,
                                    borderRadius: 17.5,
                                    border: 0
                                }}
                            >
                                <MdCall size={20} color="#fff" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { FilaChamadas };
