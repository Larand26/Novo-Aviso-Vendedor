import ClientsController from "./controllers/ClientsController.js";
import { logger } from "./utils/logger.js";

const main = async (): Promise<void> => {
  try {
    // Pega os dados dos clientes na api
    const clientsDataFromApi = await ClientsController.getClientsDataFromApi();

    if (!clientsDataFromApi || clientsDataFromApi.success === false) {
      logger.error(
        "Falha ao obter os dados dos clientes: " + clientsDataFromApi.error,
      );
    }
    logger.success("Dados dos clientes obtidos com sucesso!");

    const clients = clientsDataFromApi.data || [];
    logger.info(`Número de clientes obtidos da API: ${clients.length}`);
    const clientsDataFromDB =
      await ClientsController.getClientsDataFromDB(clients);

    if (!clientsDataFromDB || clientsDataFromDB.length === 0) {
      logger.warning("Nenhum dado de cliente encontrado no banco de dados.");
    }
    logger.info(
      `Número de clientes obtidos do banco de dados: ${clientsDataFromDB.length}`,
    );
  } catch (error) {
    logger.error("An error occurred: " + error);
  }
};
main();
