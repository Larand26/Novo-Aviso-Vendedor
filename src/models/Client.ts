import chalk from "chalk";

class Client {
  public vendedorId: string | null;
  public dealId: string | null;
  public organizationId: string | null;
  public taskId: string | null;
  constructor(
    public name: string,
    public cnpj: string,
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
    const formatValue = (value: string | null): string =>
      value ? chalk.whiteBright(value) : chalk.gray("- pendente -");

    const label = (text: string): string => chalk.cyanBright(text.padEnd(16));
    const divider = chalk.gray("-".repeat(52));

    console.log(divider);
    console.log(chalk.bold.bgBlue.white(" CLIENTE "), chalk.bold(this.name));
    console.log(`${label("CNPJ")}: ${chalk.whiteBright(this.cnpj)}`);
    console.log(`${label("Vendedor ID")}: ${formatValue(this.vendedorId)}`);
    console.log(`${label("Deal ID")}: ${formatValue(this.dealId)}`);
    console.log(
      `${label("Organization ID")}: ${formatValue(this.organizationId)}`,
    );
    console.log(`${label("Task ID")}: ${formatValue(this.taskId)}`);
    console.log(divider);
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
