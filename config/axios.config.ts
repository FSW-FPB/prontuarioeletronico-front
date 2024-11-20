import axios from "axios";

const axiosCadastro = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

const axiosCID = axios.create({
  baseURL: "http://localhost:7000",
  headers: { "Content-Type": "application/json" },
});

axiosCadastro.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosCadastro, axiosCID };
