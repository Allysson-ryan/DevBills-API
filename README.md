# API de Gestão de Transações

Esta API permite o gerenciamento de transações financeiras, incluindo criação, consulta e análise de dados financeiros.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Express**: Framework para construção de APIs RESTful.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados.
- **Typescript**: Linguagem de programação que adiciona tipagem estática ao JavaScript.
- **Joi**: Biblioteca para validação de dados.
- **Http-status-codes**: Para manuseio de códigos de status HTTP.
- **Cors**: Para habilitar o compartilhamento de recursos entre diferentes origens.

## Endpoints

### 1. **Criar Transação**

- **URL**: `/transactions`
- **Método**: `POST`
- **Corpo da Requisição** (JSON):
    ```json
    {
        "title": "Compra de supermercado",
        "amount": 150.00,
        "categoryId": "606c72ef5f1b2c1f788e5fbb",
        "date": "2024-12-31",
        "type": "expense"
    }
    ```

- **Resposta** (Status 201):
    ```json
    {
        "id": "60e6f1b8fc13a45b8764f1b2",
        "title": "Compra de supermercado",
        "amount": 150.00,
        "categoryId": "606c72ef5f1b2c1f788e5fbb",
        "date": "2024-12-31",
        "type": "expense"
    }
    ```

### 2. **Listar Transações**

- **URL**: `/transactions`
- **Método**: `GET`
- **Query Params** (opcionais):
    - `title`: Filtrar transações por título.
    - `categoryId`: Filtrar por ID de categoria.
    - `beginDate`: Filtrar por data inicial (formato: `YYYY-MM-DD`).
    - `endDate`: Filtrar por data final (formato: `YYYY-MM-DD`).

- **Resposta** (Status 200):
    ```json
    [
        {
            "id": "60e6f1b8fc13a45b8764f1b2",
            "title": "Compra de supermercado",
            "amount": 150.00,
            "categoryId": "606c72ef5f1b2c1f788e5fbb",
            "date": "2024-12-31",
            "type": "expense"
        },
        {
            "id": "60e6f1b8fc13a45b8764f1b3",
            "title": "Venda de produto",
            "amount": 300.00,
            "categoryId": "606c72ef5f1b2c1f788e5fbc",
            "date": "2024-12-30",
            "type": "income"
        }
    ]
    ```

### 3. **Dashboard de Transações**

- **URL**: `/transactions/dashboard`
- **Método**: `GET`
- **Query Params**:
    - `beginDate`: Filtrar por data inicial (formato: `YYYY-MM-DD`).
    - `endDate`: Filtrar por data final (formato: `YYYY-MM-DD`).

- **Resposta** (Status 200):
    ```json
    {
        "totalIncome": 300.00,
        "totalExpense": 150.00,
        "balance": 150.00
    }
    ```

### 4. **Evolução Financeira**

- **URL**: `/transactions/financial-evolution`
- **Método**: `GET`
- **Query Params**:
    - `year`: O ano para o qual deseja ver a evolução financeira.

- **Resposta** (Status 200):
    ```json
    {
        "year": 2024,
        "monthlyEvolutions": [
            {
                "month": "January",
                "income": 500.00,
                "expense": 200.00,
                "balance": 300.00
            },
            {
                "month": "February",
                "income": 400.00,
                "expense": 150.00,
                "balance": 250.00
            }
        ]
    }
    ```

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/username/repository-name.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd repository-name
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Configure as variáveis de ambiente:

    Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

    ```env
    FRONT_URL=http://localhost:3000
    MONGO_URI=mongodb://localhost:27017/database-name
    ```

## Execução

Para rodar a aplicação localmente, utilize o seguinte comando:

```bash
npm run dev
