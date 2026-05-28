import dotenv from "dotenv";

dotenv.config();

const configs = {
  apiUrl: process.env.URL_INTERNAL_API || "http://localhost:3000",
  timeout: 5000, // Tempo limite para requisições em milissegundos
  apiToken: process.env.INTERNAL_API_TOKEN || "", // Token de autenticação para a API interna
};

export default configs;
