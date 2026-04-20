import axios from "axios";
import rdConfig from "../config/rdConfig.js";

abstract class RDService {
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

  static async createOrganization(client: any): Promise<string | null> {
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
                value: client.ENTI_CNPJCPF,
              },
              {
                //Razão Social
                custom_field_id: "666c3ab5a6215d00190b7597",
                value: client.PEDOR_RAZAOSOCIAL,
              },
              {
                //UF
                custom_field_id: "66210743a05ab90012860c52",
                value: client.ID_UNIDFEDSIGLA,
              },
              {
                //Cidade
                custom_field_id: "66210724ed1460000ece9e71",
                value: client.CIDA_NOME,
              },
            ],
            name: client.PEDOR_RAZAOSOCIAL,
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
}

export default RDService;
