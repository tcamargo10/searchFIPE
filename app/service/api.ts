import axios from "axios";

const ApiService = axios.create({
  baseURL: "https://parallelum.com.br/fipe/api/v1",
});

export default ApiService;
