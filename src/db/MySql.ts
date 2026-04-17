import sqlConfig from "../config/sqlConfig.js";
import mysql from "mysql2/promise";

class MySqlDb {
  private pool: mysql.Pool;

  constructor() {
    // Cria o pool imediatamente
    this.pool = mysql.createPool(sqlConfig);
  }

  async query(sql: string, values?: any[]) {
    // O pool gerencia as conexões e reconnects automaticamente
    return await this.pool.execute(sql, values);
  }
}

export default new MySqlDb();
