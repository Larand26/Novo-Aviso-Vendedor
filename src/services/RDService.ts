import axios from "axios";
import rdConfig from "../config/rdConfig.js";
import { getSellerIdByCode } from "../assets/sellers.js";
import type { IClientApi } from "../interfaces/IClients.js";

abstract class RDService {
  static async getSeller(sellerId: number): Promise<string | null> {
    try {
      return getSellerIdByCode(sellerId);
    } catch (error) {
      console.error("Erro ao obter seller do RD Station:", error);
      return null;
    }
  }
  static async getOrganizations(clientName: string): Promise<string | null> {
    try {
      // Lógica para obter organizações do CRM RD Station
      const response = await axios.get(`${rdConfig.apiUrl}/organizations`, {
        params: {
          token: rdConfig.token,
          q: clientName,
          exact_name: true,
        },
        timeout: rdConfig.timeout,
      });

      if (
        response.data &&
        response.data.organizations &&
        response.data.organizations.length > 0
      ) {
        return response.data.organizations[0].id;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao obter organizações do RD Station:", error);
      return null;
    }
  }

  static async createOrganization(client: IClientApi): Promise<string | null> {
    try {
      // Lógica para criar organização no CRM RD Station
      const response = await axios.post(
        `${rdConfig.apiUrl}/organizations`,
        {
          organization: {
            organization_custom_fields: [
              {
                //CNPJ
                custom_field_id: "66201cb5ccd2b20012436271",
                value: client.client_cnpj,
              },
              {
                //Razão Social
                custom_field_id: "666c3ab5a6215d00190b7597",
                value: client.client_name,
              },
              {
                //UF
                custom_field_id: "66210743a05ab90012860c52",
                value: client.state_code,
              },
              {
                //Cidade
                custom_field_id: "66210724ed1460000ece9e71",
                value: client.city_name,
              },
            ],
            name: client.client_name,
          },
        },
        {
          params: {
            token: rdConfig.token,
          },
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          timeout: rdConfig.timeout,
        },
      );

      if (response.data && response.data.organization) {
        return response.data.id;
      }
      return null;
    } catch (error) {
      console.error("Erro ao criar organização no RD Station:", error);
      return null;
    }
  }

  static async getDeals(clientName: string): Promise<string | null> {
    try {
      // Lógica para obter deals do CRM RD Station
      const response = await axios.get(`${rdConfig.apiUrl}/deals`, {
        params: {
          token: rdConfig.token,
          name: clientName,
          exact_name: true,
        },
        timeout: rdConfig.timeout,
      });

      if (
        response.data &&
        response.data.deals &&
        response.data.deals.length > 0
      ) {
        return response.data.deals[0].id;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao obter deals do RD Station:", error);
      return null;
    }
  }

  private static async rdPhones(
    client: IClientApi,
  ): Promise<{ number: string; type: string }[]> {
    const phones: { number: string; type: string }[] = [];

    if (client.client_phone) {
      phones.push({ number: client.client_phone, type: "cellphone" });
    }
    if (client.client_cellphone) {
      phones.push({ number: client.client_cellphone, type: "cellphone" });
    }
    return phones;
  }

  private static async rdEmail(email: string): Promise<string> {
    const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    if (emailRegex.test(email)) {
      return email;
    }
    return "exemplo@email.com";
  }

  static async createDeal(
    client: IClientApi,
    organizationId: string,
    sellerId: string,
  ): Promise<string | null> {
    try {
      const response = await axios.post(
        `${rdConfig.apiUrl}/deals`,
        {
          contacts: [
            {
              name: client.client_name,
              emails: [
                {
                  email: await this.rdEmail(client.client_email),
                },
              ],
              phones: await this.rdPhones(client),
            },
          ],
          organization: {
            _id: organizationId,
          },
          deal: { name: client.client_name },
          distribution_settings: {
            owner: {
              email: "exemplo@email.com",
              id: sellerId,
              type: "user",
            },
          },
        },
        {
          params: {
            token: rdConfig.token,
          },
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          timeout: rdConfig.timeout,
        },
      );
      if (response.data && response.data.id) {
        return response.data.id;
      }
      return null;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao criar deal no RD Station:", {
          status: error.response?.status,
          data: error.response?.data,
        });
      } else {
        console.error("Erro ao criar deal no RD Station:", error);
      }
      return null;
    }
  }
  static async updateDeal(
    dealId: string,
    sellerId: string,
  ): Promise<{ success: boolean }> {
    try {
      const response = await axios.put(
        `${rdConfig.apiUrl}/deals/${dealId}`,
        {
          deal: { user_id: sellerId },
        },
        {
          params: {
            token: rdConfig.token,
          },
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          timeout: rdConfig.timeout,
        },
      );

      if (response.status === 200) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Erro ao atualizar deal no RD Station:", error);
      return { success: false };
    }
  }

  static async getTask(dealId: string): Promise<string | null> {
    try {
      const response = await axios.get(`${rdConfig.apiUrl}/tasks`, {
        params: {
          deal_id: dealId,
          done: false,
          type: "call",
          token: rdConfig.token,
        },
      });

      if (response.data && response.data.total > 0) {
        return response.data.tasks[0].id;
      }
      return null;
    } catch (error) {
      console.error("Erro ao obter tasks do RD Station:", error);
      return null;
    }
  }

  static async createTask(
    dealId: string,
    sellerId: string,
  ): Promise<string | null> {
    try {
      const taskDate = new Date();
      taskDate.setDate(taskDate.getDate() + rdConfig.taskDelayDays);
      const dateTaskDate = taskDate.toISOString().split("T")[0];

      const response = await axios.post(
        `${rdConfig.apiUrl}/tasks`,
        {
          task: {
            subject: "Ligar para o cliente",
            type: "call",
            deal_id: dealId,
            user_ids: [sellerId],
            done: false,
            notes: "",
            date: dateTaskDate,
            hour: "17:00",
          },
        },
        {
          params: {
            token: rdConfig.token,
          },
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          timeout: rdConfig.timeout,
        },
      );
      if (response.data && (response.data.id || response.data._id)) {
        return response.data.id ?? response.data._id;
      }
      return null;
    } catch (error) {
      console.error("Erro ao criar task no RD Station:", error);
      return null;
    }
  }

  static async updateTask(
    taskId: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const newTaskDate = new Date();
      newTaskDate.setDate(newTaskDate.getDate() + 30);
      const dateTaskDate = newTaskDate.toISOString().split("T")[0];

      const response = await axios.put(
        `${rdConfig.apiUrl}/tasks/${taskId}`,
        {
          task: {
            date: dateTaskDate,
            hour: "17:00",
          },
        },
        {
          params: {
            token: rdConfig.token,
          },
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          timeout: rdConfig.timeout,
        },
      );

      if (response.status === 200) {
        return { success: true };
      } else {
        return {
          success: false,
          error: `Erro ao atualizar task no RD Station: status ${response.status}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}

export default RDService;
