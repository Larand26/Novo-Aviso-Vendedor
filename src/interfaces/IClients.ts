export interface IClientApi {
  client_id: number;
  client_name: string;
  salesperson_id: number;
  client_cnpj: string;
  client_email: string;
  client_cellphone: string;
  client_phone: string;
  state_code: string;
  city_name: string;
  client_ddd: number;
  client_ddd_fax: string;
  client_cellphone_ddd: number;
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
