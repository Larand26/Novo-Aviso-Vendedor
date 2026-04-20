import dotenv from "dotenv";
dotenv.config();

const rdConfig = {
  apiUrl: "https://crm.rdstation.com/api/v1", // URL base da API do RD Station
  token: process.env.RD_TOKEN || "", // Token de autenticação para acessar a API do RD Station
  timeout: 5000, // Tempo limite para requisições em milissegundos
};

export default rdConfig;
