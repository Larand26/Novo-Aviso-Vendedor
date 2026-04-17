abstract class ClientsService {
  static async getClientsDataFromApi(): Promise<Object> {
    try {
      return {
        success: true,
        data: [],
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}

export default ClientsService;
