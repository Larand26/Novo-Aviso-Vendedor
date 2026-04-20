import RDService from "../services/RDService.js";

abstract class RDController {
  static async getOrganizations(clientName: string): Promise<string | null> {
    return await RDService.getOrganizations(clientName);
  }
  static async createOrganization(client: any): Promise<string | null> {
    return await RDService.createOrganization(client);
  }
  static async getDeals(organizationId: string): Promise<string | null> {
    return await RDService.getDeals(organizationId);
  }
  static async createDeal(
    client: any,
    organizationId: string,
    sellerId: string,
  ): Promise<string | null> {
    return await RDService.createDeal(client, organizationId, sellerId);
  }
}
export default RDController;
