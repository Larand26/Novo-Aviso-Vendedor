import ClientsController from "./controllers/ClientsController.js";
import { logger } from "./utils/Logger.js";

const main = async (): Promise<void> => {
  try {
    // Pega os dados dos clientes na api
    const clientsData = await ClientsController.getClientsDattaFromApi();

    if (!clientsData || clientsData.success === false) {
      logger.error(
        "Falha ao obter os dados dos clientes: " + clientsData.error,
      );
    }

    logger.success("Dados dos clientes obtidos com sucesso!");
  } catch (error) {
    logger.error("An error occurred: " + error);
  }
};
main();
