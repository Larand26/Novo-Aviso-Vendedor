import ClientsService from "../services/ClientsService.js";

abstract class ClientsController {
  static async getClientsDattaFromApi(): Promise<Object> {
    return await ClientsService.getClientsDataFromApi();
  }
}

export default ClientsController;
