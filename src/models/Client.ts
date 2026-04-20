class Client {
  constructor(
    public name: string,
    public cnpj: string,
    public vendedorId: string | null,
    public dealId: string | null,
    public organizationId: string | null,
    public taskId: string | null,
  ) {
    // Contrutor para inicializar as propriedades do cliente
    this.name = name;
    this.cnpj = cnpj;

    this.vendedorId = null; // Inicializa o vendedorId como null
    this.dealId = null; // Inicializa o dealId como null
    this.organizationId = null; // Inicializa o organizationId como null
    this.taskId = null; // Inicializa o taskId como null
  }

  infos(): void {
    console.log(`Nome: ${this.name}`);
    console.log(`CNPJ: ${this.cnpj}`);
    console.log(`Vendedor ID: ${this.vendedorId}`);
    console.log(`Deal ID: ${this.dealId}`);
    console.log(`Organization ID: ${this.organizationId}`);
    console.log(`Task ID: ${this.taskId}`);
  }

  updateVendedorId(vendedorId: string): void {
    this.vendedorId = vendedorId;
  }

  updateDealId(dealId: string): void {
    this.dealId = dealId;
  }

  updateOrganizationId(organizationId: string): void {
    this.organizationId = organizationId;
  }

  updateTaskId(taskId: string): void {
    this.taskId = taskId;
  }
}
export default Client;
