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
    let clientsDataFromDB = await ClientsController.getClientsDataFromDB(
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
      const c = new Client(client.client_name, client.client_cnpj);

      // Pega o sellerId do cliente
      let sellerId = await RDController.getSeller(client.salesperson_id);
      if (!sellerId) {
        sellerId = "62990442a8e97e000e3879a4"; // ID do vendedor padrão
      }

      c.updateSellerId(sellerId); // Atualiza o sellerId do cliente

      // Cria ou pega a organização no CRM
      let organizationId = await RDController.getOrganizations(
        client.client_name,
      );

      if (!organizationId) {
        organizationId = await RDController.createOrganization(client);
      }

      if (!organizationId) {
        logger.error(
          `Falha ao criar ou obter a organização para o cliente ${client.client_name}`,
        );
        continue; // Pula para o próximo cliente
      }

      c.updateOrganizationId(organizationId || ""); // Atualiza o organizationId do cliente

      // Cria ou pega a Deal no CRM
      let dealId = await RDController.getDeals(client.client_name);

      if (!dealId) {
        dealId = await RDController.createDeal(
          client,
          organizationId,
          sellerId,
        );
      }

      if (!dealId) {
        logger.error(
          `Falha ao criar ou obter a deal para o cliente ${client.client_name}`,
        );
        continue; // Pula para o próximo cliente
      }

      const updateResult = await RDController.updateDeal(dealId, sellerId);
      if (!updateResult.success) {
        logger.error(
          `Falha ao atualizar a deal para o cliente ${client.client_name}`,
        );
      }

      c.updateDealId(dealId || ""); // Atualiza o dealId do cliente

      // pega ou Cria o as taks no CRM
      let taskId = await RDController.getTask(dealId);

      if (!taskId) {
        taskId = await RDController.createTask(dealId, sellerId);
      }

      if (!taskId) {
        logger.error(
          `Falha ao criar ou obter a task para o cliente ${client.client_name}`,
        );
        continue; // Pula para o próximo cliente
      }

      c.updateTaskId(taskId || ""); // Atualiza o taskId do cliente

      c.infos();

      // Salva o cliente no banco de dados
      const saveResult = await ClientsController.saveClientToDB(c);

      if (!saveResult.success) {
        logger.error(
          `Falha ao salvar o cliente ${client.client_name} no banco de dados: ${saveResult.error}`,
        );
        continue; // Pula para o próximo cliente
      } else {
        logger.success(
          `Cliente ${client.client_name} salvo com sucesso no banco de dados!`,
        );
      }
    }

    clientsDataFromDB = await ClientsController.getClientsDataFromDB(
      clientsDataFromApi.data || [],
    );
    logger.info(
      `Número de clientes no banco de dados após processamento: ${clientsDataFromDB.length}`,
    );

    // Atualiza as Tasks no CRM
    for (const client of clientsDataFromDB) {
      const c = new Client(client.cliente, client.cnpj);
      c.updateSellerId(client.vendedor_id);
      c.updateOrganizationId(client.organization_id);
      c.updateDealId(client.deal_id);
      c.updateTaskId(client.task_id);

      c.infos();

      if (!c.taskId) {
        logger.warning(
          `Cliente ${client.cliente} não possui taskId, pulando atualização de task.`,
        );
        continue; // Pula para o próximo cliente
      }

      const updateTaskResult = await RDController.updateTask(c.taskId);
      if (!updateTaskResult.success) {
        logger.error(
          `Falha ao atualizar a task para o cliente ${client.cliente}: ${updateTaskResult.error}`,
        );
        continue; // Pula para o próximo cliente
      } else {
        logger.success(
          `Task para o cliente ${client.cliente} atualizada com sucesso!`,
        );
      }
    }
  } catch (error) {
    logger.error("An error occurred: " + error);
  }
};
main();
