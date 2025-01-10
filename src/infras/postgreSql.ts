import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres', // replace with your PostgreSQL username
    password: 'postgres', // replace with your PostgreSQL password
    database: 'library',
    entities: ['dist/domain/**/*.js'],
    migrations: ['dist/migrations/*.js'],
    migrationsTableName: 'migrations'
});

export default AppDataSource;
