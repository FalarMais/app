const verificarDatas = (horaMenor, horaMaior) => {
  let vazioOuNulo = ["", "-", null];
  const existeCamposNulos =
    vazioOuNulo.includes(horaMenor) || vazioOuNulo.includes(horaMaior);

  return existeCamposNulos;
};
const setarHorarios = (dataMenor, dataMaior) => {
  const regex = /[^\d:]/g;

  const [inicioHora, inicioMinuto] = dataMenor.replace(regex, "").split(":");

  const [atendimentoHora, atendimentoMinuto] = dataMaior
    .replace(regex, "")
    .split(":");

  const inicio = new Date();
  inicio.setHours(inicioHora);
  inicio.setMinutes(inicioMinuto);

  const atendimento = new Date();
  atendimento.setHours(atendimentoHora);
  atendimento.setMinutes(atendimentoMinuto);

  return { inicio, atendimento };
};

const calcularMinutosSegundos = tempo => {
  const minutos = Math.floor(tempo / 60000);
  const segundos = Math.floor((tempo % 60000) / 1000);

  const tempoFinal = `${minutos
    .toString()
    .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}.`;
  return tempoFinal;
};

export { setarHorarios, verificarDatas, calcularMinutosSegundos };
