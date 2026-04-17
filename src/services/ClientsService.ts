import axios from "axios";

import configs from "../config/internalApi.js";

import MySqlDb from "../db/MySql.js";

abstract class ClientsService {
  static async getClientsDataFromApi(): Promise<{
    success: boolean;
    data?: Array<Object>;
    error?: string;
  }> {
    try {
      const response = await axios.get(`${configs.apiUrl}/crm/pegar-clientes`, {
        timeout: configs.timeout,
      });
      return {
        success: true,
        data: response.data?.data || [],
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  static async getClientsDataFromDB(
    clients: Array<{ ENTI_CNPJCPF?: string; [key: string]: any }>,
  ): Promise<Array<Object>> {
    try {
      // Pega apenas os CNPJs válidos (filtra vazios/undefined)
      const cnpjs = clients
        .map((client) => client?.ENTI_CNPJCPF)
        .filter((cnpj) => Boolean(cnpj));

      cnpjs.push("09112200000100");
      // Se não sobrou nenhum CNPJ válido, retorna lista vazia para evitar erro no SQL
      if (cnpjs.length === 0) {
        return [];
      }

      const [rows] = await MySqlDb.query(
        "SELECT * FROM clientes_aviso_vendedor WHERE cnpj IN (?)",
        [cnpjs], // Passa o array diretamente
      );
      return rows as Array<Object>;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
}

export default ClientsService;
