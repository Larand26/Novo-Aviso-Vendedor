import RDService from "../services/RDService.js";

abstract class RDController {
  static async getSeller(sellerId: number): Promise<string | null> {
    return await RDService.getSeller(sellerId);
  }
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
  static async updateDeal(
    dealId: string,
    sellerId: string,
  ): Promise<{ success: boolean }> {
    return await RDService.updateDeal(dealId, sellerId);
  }
  static async getTask(dealId: string): Promise<string | null> {
    return await RDService.getTask(dealId);
  }
  static async createTask(
    dealId: string,
    sellerId: string,
  ): Promise<string | null> {
    return await RDService.createTask(dealId, sellerId);
  }
}
export default RDController;
