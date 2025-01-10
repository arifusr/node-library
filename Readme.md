# Library Project

This is a Library project built with Node.js, TypeScript, Fastify, and PostgreSQL. The project includes a REST API for managing books in a library.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

### Running the Project Locally

1. Clone the repository:

    ```bash
    git clone https://github.com/arifusr/node-library.git
    cd node-library
    ```

2. Install dependencies:

    ```bash
    npm install -g pnpm
    pnpm install
    ```

3. Create a .env file in the root of the project with the following content:

    ```
    DB_HOST=localhost
    DB_NAME=library
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_PORT=5432
    ```

4. Start the PostgreSQL database (you can use Docker for this):

    ```bash
    docker run --name postgres_db -e POSTGRES_DB=library -e POSTGRES_USER=your_db_user -e POSTGRES_PASSWORD=your_db_password -p 5432:5432 -d postgres:15
    ```

5. Run the migrations:

    ```bash
    npx typeorm migration:run -d src/infras/postgreSql.ts
    ```

6. Build the project:

    ```bash
    pnpm run build
    ```

7. Start the application:
    ```bash
    pnpm start
    ```

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