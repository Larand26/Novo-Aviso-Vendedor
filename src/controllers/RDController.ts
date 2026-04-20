import RDService from "../services/RDService.js";

abstract class RDController {
  static async getOrganizations(clientName: string): Promise<string | null> {
    return await RDService.getOrganizations(clientName);
  }
  static async createOrganization(client: any): Promise<string | null> {
    return await RDService.createOrganization(client);
  }
}
export default RDController;
