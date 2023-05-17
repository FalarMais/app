import axios from "axios";

const api = axios.create({
  baseURL: "http://api.falarmais.com.br/services/v1/"
});

export { api };
