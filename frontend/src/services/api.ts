import axios from "axios";

export const api = axios.create({ // Instância do Axios configurada com a URL base da API
  baseURL: "http://localhost:5291/api"
});