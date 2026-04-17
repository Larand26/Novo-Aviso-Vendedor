import ClientsService from "../services/ClientsService.js";

abstract class ClientsController {
  static async getClientsDataFromApi(): Promise<{
    success: boolean;
    data?: Array<object>;
    error?: string;
  }> {
    return await ClientsService.getClientsDataFromApi();
  }

  static async getClientsDataFromDB(
    clients: Array<object>,
  ): Promise<Array<object>> {
    return await ClientsService.getClientsDataFromDB(clients);
  }
}

export default ClientsController;
