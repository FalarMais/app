import { useEffect } from "react";

const useInicializarTabela = (data, idTabela) => {
  const init = data => {
    if (data.length > 0) {
      window.$(`#${idTabela ? idTabela : "example"}`).DataTable({
        responsive: true,
        rowReorder: {
          selector: "td:nth-child(2)"
        },
        language: {
          url: "https://cdn.datatables.net/plug-ins/1.11.3/i18n/pt_br.json"
        }
      });
    }
  };
  useEffect(() => {
    init(data);
    // eslint-disable-next-line
  }, [data]);
};

export { useInicializarTabela };
