import dotenv from "dotenv";
dotenv.config();

const rdConfig = {
  apiUrl: "https://crm.rdstation.com/api/v1", // URL base da API do RD Station
  token: process.env.RD_TOKEN || "", // Token de autenticação para acessar a API do RD Station
  timeout: 5000, // Tempo limite para requisições em milissegundos
  taskDelayDays: process.env.RD_TASK_DELAY_DAYS
    ? parseInt(process.env.RD_TASK_DELAY_DAYS)
    : 7, // Quantidade de dias para definir a data de conclusão da tarefa
  dealStageId: process.env.RD_DEAL_STAGE_ID || "", // ID do estágio do negócio para atualizar o negócio
};

export default rdConfig;
