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

    const clientsDataFromDB = await ClientsController.getClientsDataFromDB();
  } catch (error) {
    logger.error("An error occurred: " + error);
  }
};
main();
