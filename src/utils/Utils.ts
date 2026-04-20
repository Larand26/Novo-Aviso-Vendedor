import type { IClientApi } from "../interfaces/IClients.js";

abstract class Utils {
  static filterClientsByCNPJCPF(
    clientsFromApi: Array<IClientApi>,
    clientsFromDB: Array<{ cnpj: string }>,
  ): Array<IClientApi> {
    return clientsFromApi.filter((apiClient) => {
      return !clientsFromDB.some(
        (dbClient) => dbClient.cnpj === apiClient.ENTI_CNPJCPF,
      );
    });
  }
}

export default Utils;
