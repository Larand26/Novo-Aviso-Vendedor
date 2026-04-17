import dotenv from "dotenv";
dotenv.config();

interface sqlconfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

const sqlConfig: sqlconfig = {
  host: process.env.DB_HOST_MYSQL || "localhost",
  user: process.env.DB_USER_MYSQL || "root",
  password: process.env.DB_PASSWORD_MYSQL || "password",
  database: process.env.DB_DATABASE_MYSQL || "mydatabase",
  port: parseInt(process.env.DB_PORT_MYSQL || "3306", 10),
};

export default sqlConfig;
