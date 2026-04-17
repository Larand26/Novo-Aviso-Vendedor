import axios from "axios";

import configs from "../config/internalApi.js";

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

  static async getClientsDataFromDB(): Promise<Array<Object>> {
    try {
      return [];
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
}

export default ClientsService;
