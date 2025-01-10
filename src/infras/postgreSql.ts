import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

// Access environment variables
const dbHost = process.env['DB_HOST'];
const dbName = process.env['DB_NAME'];
const dbUserName = process.env['DB_USER'];
const dbPassword = process.env['DB_PASSWORD'];
const dbLogging   = process.env['DB_LOGGING'];

const AppDataSource = new DataSource({
    type: 'postgres',
    host: dbHost,
    port: 5432,
    username: dbUserName,
    password: dbPassword,
    database: dbName,
    entities: ['dist/domain/**/*.js'],
    migrations: ['dist/migrations/*.js'],
    migrationsTableName: 'migrations',
    logging: dbLogging === 'true',
});

console.log(AppDataSource)

export const Connection = async (): Promise<DataSource> => {
    return await AppDataSource.initialize();
};

export default AppDataSource;
