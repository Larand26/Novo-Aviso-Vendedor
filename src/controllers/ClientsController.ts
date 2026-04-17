import ClientsService from "../services/ClientsService.js";

abstract class ClientsController {
  static async getClientsDataFromApi(): Promise<{
    success: boolean;
    data?: Array<any>;
    error?: string;
  }> {
    return await ClientsService.getClientsDataFromApi();
  }

  static async getClientsDataFromDB(clients: Array<any>): Promise<Array<any>> {
    return await ClientsService.getClientsDataFromDB(clients);
  }
}

export default ClientsController;
