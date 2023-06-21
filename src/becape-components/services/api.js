import axios from "axios";

const api = axios.create({
  baseURL: "http://165.22.184.175/services/v1/"
});

export { api };
