import ClientsService from "../services/ClientsService.js";
import type { IClientApi, IClientDB } from "../interfaces/IClients.js";

abstract class ClientsController {
  static async getClientsDataFromApi(): Promise<{
    success: boolean;
    data: Array<IClientApi>;
    error?: string;
  }> {
    return await ClientsService.getClientsDataFromApi();
  }

  static async getClientsDataFromDB(
    clients: Array<IClientApi>,
  ): Promise<Array<IClientDB>> {
    return await ClientsService.getClientsDataFromDB(clients);
  }
}

export default ClientsController;
