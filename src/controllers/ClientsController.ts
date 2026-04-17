import ClientsService from "../services/ClientsService.js";

abstract class ClientsController {
  static async getClientsDattaFromApi(): Promise<{
    success: boolean;
    data?: Array<object>;
    error?: string;
  }> {
    return await ClientsService.getClientsDataFromApi();
  }
}

export default ClientsController;
