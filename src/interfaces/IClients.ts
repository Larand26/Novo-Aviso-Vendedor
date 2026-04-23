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
  id: number;
  data_criacao: Date;
  cliente: string;
  cnpj: string;
  vendedor_id: string;
  deal_id: string;
  organization_id: string;
  task_id: string;
}

export interface IClientModel {
  name: string;
  cnpj: string;
  sellerId: string | null;
  dealId: string | null;
  organizationId: string | null;
  taskId: string | null;
}
