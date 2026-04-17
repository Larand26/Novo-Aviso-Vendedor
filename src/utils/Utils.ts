abstract class Utils {
  static filterClientsByCNPJCPF(
    clientsFromApi: Array<{ ENTI_CNPJCPF: string }>,
    clientsFromDB: Array<{ cnpj: string }>,
  ): Array<{ ENTI_CNPJCPF: string }> {
    return clientsFromApi.filter((apiClient) => {
      return !clientsFromDB.some(
        (dbClient) => dbClient.cnpj === apiClient.ENTI_CNPJCPF,
      );
    });
  }
}

export default Utils;
