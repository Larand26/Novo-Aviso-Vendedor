# Aviso Vendedor

![Node Version](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)

Esta aplicação automatiza a criação e atualização de tarefas em negociações dentro da plataforma **RD Station CRM**. O objetivo é otimizar o fluxo de trabalho da equipe comercial, garantindo que o gerenciamento de atividades ocorra em segundo plano enquanto os vendedores focam no fechamento de contas.

## 📌 Sumário

- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Licença](#-licença)

---

## 🚀 Tecnologias Utilizadas

- **Core:** Node.js (v24+) & TypeScript
- **Desktop Shell:** Electron
- **Integração:** API RD Station

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- **Node.js** (Versão 24.0.0 ou superior)
- **Gerenciador de pacotes** (NPM ou Yarn)
- Credenciais de acesso à API da RD Station

## ⚙️ Instalação e Configuração

1. **Clonar o repositório**
   ```bash
   git clone [https://github.com/Larand26/novo-aviso-vendedor.git](https://github.com/Larand26/Novo-Aviso-Vendedor.git)
   cd aviso-vendedor
   ```

## 🌍 Configuração de Ambiente

```env
# RD Station configuration
RD_TOKEN=
RD_TASK_DELAY_DAYS=
MODE=
RD_DEAL_STAGE_ID=

# Internal API configuration
URL_INTERNAL_API=
INTERNAL_API_TOKEN=

# Application mode (development, production, etc.)
MODO=
COMPANY_ID=

# MySQL configuration
DB_HOST_MYSQL=
DB_USER_MYSQL=
DB_PASSWORD_MYSQL=
DB_DATABASE_MYSQL=
DB_PORT_MYSQL=
DB_TABLE_MYSQL=

# EMAIL
TOKEN_EMAIL=
URL_EMAIL_API=
```
