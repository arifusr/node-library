# Library Project

This is a Library project built with Node.js, TypeScript, Fastify, and PostgreSQL. The project includes a REST API for managing books in a library.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

### Running the Project with Docker

1. Clone the repository:

    ```bash
    git clone https://github.com/arifusr/node-library.git
    cd node-library
    ```

2. Start the containers:

    ```bash
    docker-compose up --build -d
    ```

    This will start both the Node.js application and the PostgreSQL database in separate containers. The application will be accessible at `http://localhost:8080`.

### Running Migrations

To run the migrations, use the following command:

```bash
docker-compose exec app npx typeorm migration:run -d dist/infras/postgreSql.js