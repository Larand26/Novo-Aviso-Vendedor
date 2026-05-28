import axios from "axios";

import configs from "../config/internalApi.js";
import sqlConfig from "../config/sqlConfig.js";
import type {
  IClientApi,
  IClientDB,
  IClientModel,
} from "../interfaces/IClients.js";

import MySqlDb from "../db/MySql.js";

const tableName = sqlConfig.table.trim();

function getTableName(): string {
  if (!tableName) {
    throw new Error("DB_TABLE_MYSQL não configurada");
  }

  return tableName;
}

abstract class ClientsService {
  static async getClientsDataFromApi(): Promise<{
    success: boolean;
    data: Array<IClientApi>;
    error?: string;
  }> {
    try {
      const response = await axios.get(`${configs.apiUrl}`, {
        timeout: configs.timeout,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${configs.apiToken}`,
        },
      });
      return {
        success: true,
        data: response.data?.data || [],
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  static async getClientsDataFromDB(
    clients: Array<IClientApi>,
  ): Promise<Array<IClientDB>> {
    try {
      // Pega apenas os CNPJs válidos (filtra vazios/undefined)
      const cnpjs = [
        ...new Set(
          clients
            .map((client) => client?.client_cnpj)
            .filter((cnpj): cnpj is string => Boolean(cnpj)),
        ),
      ];

      // Se não sobrou nenhum CNPJ válido, retorna lista vazia para evitar erro no SQL
      if (cnpjs.length === 0) {
        return [];
      }

      const table = getTableName();
      const [rows] = await MySqlDb.query(
        `SELECT * FROM ${table} WHERE cnpj IN (?)`,
        [cnpjs], // Passa o array diretamente
      );
      return rows as Array<IClientDB>;
    } catch (error) {
      console.error("Erro ao buscar clientes no banco de dados:", error);
      return []; // Retorna lista vazia em caso de erro para evitar falhas no processamento
    }
  }

  static async saveClientToDB(client: IClientModel): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const table = getTableName();
      await MySqlDb.query(
        `INSERT INTO ${table} (cliente, cnpj, vendedor_id, deal_id, organization_id, task_id) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE cliente = VALUES(cliente), vendedor_id = VALUES(vendedor_id), deal_id = VALUES(deal_id), organization_id = VALUES(organization_id), task_id = VALUES(task_id)`,
        [
          client.name,
          client.cnpj,
          client.sellerId,
          client.dealId,
          client.organizationId,
          client.taskId,
        ],
      );
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}

export default ClientsService;
