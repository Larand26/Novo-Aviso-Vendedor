import ClientsController from "./controllers/ClientsController.js";
import Utils from "./utils/Utils.js";
import Client from "./models/Client.js";
import { logger } from "./utils/logger.js";
import RDController from "./controllers/RDController.js";

const main = async (): Promise<void> => {
  try {
    // Pega os dados dos clientes na api
    const clientsDataFromApi = await ClientsController.getClientsDataFromApi();

    if (!clientsDataFromApi || clientsDataFromApi.success === false) {
      logger.error(
        "Falha ao obter os dados dos clientes: " + clientsDataFromApi.error,
      );
      return;
    }
    logger.success("Dados dos clientes obtidos com sucesso!");

    logger.info(
      `Número de clientes obtidos da API: ${clientsDataFromApi.data?.length || 0}`,
    );
    const clientsDataFromDB = await ClientsController.getClientsDataFromDB(
      clientsDataFromApi.data || [],
    );

    if (!clientsDataFromDB || clientsDataFromDB.length === 0) {
      logger.warning("Nenhum dado de cliente encontrado no banco de dados.");
    }
    logger.info(
      `Número de clientes obtidos do banco de dados: ${clientsDataFromDB.length}`,
    );

    const filteredClients = Utils.filterClientsByCNPJCPF(
      clientsDataFromApi.data || [],
      clientsDataFromDB,
    );
    logger.info(`Número de clientes filtrados: ${filteredClients.length}`);

    for (const client of filteredClients) {
      const c = new Client(client.PEDOR_RAZAOSOCIAL, client.ENTI_CNPJCPF);

      // Pega o sellerId do cliente
      let sellerId = await RDController.getSeller(client.ID_CODVENDEDOR);
      if (!sellerId) {
        sellerId = "62990442a8e97e000e3879a4"; // ID do vendedor padrão
      }

      c.updateSellerId(sellerId); // Atualiza o sellerId do cliente

      // Cria ou pega a organização no CRM
      let organizationId = await RDController.getOrganizations(
        client.PEDOR_RAZAOSOCIAL,
      );

      if (!organizationId) {
        organizationId = await RDController.createOrganization(client);
      }

      if (!organizationId) {
        logger.error(
          `Falha ao criar ou obter a organização para o cliente ${client.PEDOR_RAZAOSOCIAL}`,
        );
        continue; // Pula para o próximo cliente
      }

      c.updateOrganizationId(organizationId || ""); // Atualiza o organizationId do cliente

      // Cria ou pega a Deal no CRM
      let dealId = await RDController.getDeals(client.PEDOR_RAZAOSOCIAL);

      if (!dealId) {
        dealId = await RDController.createDeal(
          client,
          organizationId,
          sellerId,
        );
      }

      if (!dealId) {
        logger.error(
          `Falha ao criar ou obter a deal para o cliente ${client.PEDOR_RAZAOSOCIAL}`,
        );
        continue; // Pula para o próximo cliente
      }

      c.updateDealId(dealId || ""); // Atualiza o dealId do cliente

      c.infos();
    }
  } catch (error) {
    logger.error("An error occurred: " + error);
  }
};
main();
