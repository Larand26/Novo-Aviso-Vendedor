import axios from "axios";

import configs from "../config/internalApi.js";
import type {
  IClientApi,
  IClientDB,
  IClientModel,
} from "../interfaces/IClients.js";

import MySqlDb from "../db/MySql.js";

abstract class ClientsService {
  static async getClientsDataFromApi(): Promise<{
    success: boolean;
    data: Array<IClientApi>;
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
            .map((client) => client?.ENTI_CNPJCPF)
            .filter((cnpj): cnpj is string => Boolean(cnpj)),
        ),
      ];

      // Se não sobrou nenhum CNPJ válido, retorna lista vazia para evitar erro no SQL
      if (cnpjs.length === 0) {
        return [];
      }

      const [rows] = await MySqlDb.query(
        "SELECT * FROM clientes_aviso_vendedor WHERE cnpj IN (?)",
        [cnpjs], // Passa o array diretamente
      );
      return rows as Array<IClientDB>;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  static async saveClientToDB(client: IClientModel): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      await MySqlDb.query(
        "INSERT INTO clientes_aviso_vendedor (cliente, cnpj, vendedor_id, deal_id, organization_id, task_id) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE cliente = VALUES(cliente), vendedor_id = VALUES(vendedor_id), deal_id = VALUES(deal_id), organization_id = VALUES(organization_id), task_id = VALUES(task_id)",
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
