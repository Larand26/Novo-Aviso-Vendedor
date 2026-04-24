import RDService from "../services/RDService.js";
import type { IClientApi } from "../interfaces/IClients.js";

abstract class RDController {
  static async getSeller(sellerId: number): Promise<string | null> {
    return await RDService.getSeller(sellerId);
  }
  static async getOrganizations(clientName: string): Promise<string | null> {
    return await RDService.getOrganizations(clientName);
  }
  static async createOrganization(client: IClientApi): Promise<string | null> {
    return await RDService.createOrganization(client);
  }
  static async getDeals(name: string): Promise<string | null> {
    return await RDService.getDeals(name);
  }
  static async createDeal(
    client: IClientApi,
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

  static async updateTask(
    taskId: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await RDService.updateTask(taskId);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
export default RDController;
