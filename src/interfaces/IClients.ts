export interface IClientApi {
  ID_CODENTIDADE: number;
  PEDOR_RAZAOSOCIAL: string;
  ID_CODVENDEDOR: number;
  ENTI_CNPJCPF: string;
  ENTI_EMAIL: string;
  ENTI_CELULAR: string;
  ENTI_FONE: string;
  ID_UNIDFEDSIGLA: string;
  CIDA_NOME: string;
  ENTI_DDD: number;
  ENTI_DDD_FAX: string;
  ENTI_DDD_CELULAR: string;
}

export interface IClientDB {
  cnpj: string;
  [key: string]: any;
}
