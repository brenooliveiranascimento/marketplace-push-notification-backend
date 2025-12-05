# Marketplace - Backend - RocketSeat

Este é o backend do projeto **marketplace**.

## 🚀 Tecnologias

- **Node.js**
- **TypeScript**
- **TypeORM**
- **SQLite**

## 📦 Instalação e Execução

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local.

### 1 Clonar o repositório

```sh
git clone https://github.com/rocketseat-education/marketplace-backend.git
cd marketplace-backend
```

### 2 Instalar as dependências

Utilize o gerenciador de pacotes **yarn** ou **npm** para instalar todas as dependências do projeto:

```sh
yarn
ou
npm i
```

### 3️ Rodar as migrations

Execute o comando abaixo para criar as tabelas no banco de dados:

```sh
yarn migration:run
ou
npm run migration:run
```

### 4 Pegar credenciais do onesignal

Agora, seguindo as instruções da aula ou na documentação do onesignal, deve por as credenciais do app_id e api_key na .env
Documentação: https://documentation.onesignal.com/reference/rest-api-overview
```sh
ONESIGNAL_APP_ID="your-onesignal-app-id"
ONESIGNAL_API_KEY="your-onesignal-rest-api-key"
```


### 5 Iniciar o servidor

Agora, basta rodar o servidor com:

```sh
yarn dev
ou
npm run dev
```

O backend estará rodando em `http://localhost:3001`.
Para acessar a documentação `http://localhost:3001/docs`
