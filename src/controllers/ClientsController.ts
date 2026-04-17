import ClientsService from "../services/ClientsService.js";

abstract class ClientsController {
  static async getClientsDataFromApi(): Promise<{
    success: boolean;
    data?: Array<object>;
    error?: string;
  }> {
    return await ClientsService.getClientsDataFromApi();
  }

  static async getClientsDataFromDB(): Promise<Array<object>> {
    return await ClientsService.getClientsDataFromDB();
  }
}

export default ClientsController;
