import dotenv from "dotenv";

dotenv.config();

const configs = {
  mode: process.env.MODE || "development", // Modo de execução (desenvolvimento, produção, etc.)
};

export default configs;
