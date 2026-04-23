import ClientsService from "../services/ClientsService.js";
import type {
  IClientApi,
  IClientDB,
  IClientModel,
} from "../interfaces/IClients.js";

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

  static async saveClientToDB(client: IClientModel): Promise<{
    success: boolean;
    error?: string;
  }> {
    return await ClientsService.saveClientToDB(client);
  }
}

export default ClientsController;
