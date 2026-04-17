import ClientsController from "./controllers/ClientsController.js";

const main = async (): Promise<void> => {
  try {
    // Pega os dados dos clientes na api
    const clientsData = await ClientsController.getClientsDattaFromApi();
    console.log(clientsData);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
main();
