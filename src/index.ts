import fastify from 'fastify';
import { MainHandler } from './routes/main';
import { LibraryHandler } from './routes/library';
import { LibraryServiceImpl } from './domain/library/service/main';
import { BookServiceImpl } from './domain/library/service/books';
import { BookRepository } from './domain/library/repository/book';
import AppDataSource, { Connection } from './infras/postgreSql';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import * as dotenv from 'dotenv';
dotenv.config();

const server = fastify();

const swaggerOptions = {
    swagger: {
        info: {
            title: 'Library API',
            description: 'API documentation for the Library project',
            version: '1.0.0',
        },
        host: 'localhost:8080',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
};

const swaggerUiOptions = {
    routePrefix: '/docs',
    exposeRoute: true,
};

server.register(fastifySwagger, swaggerOptions);
server.register(fastifySwaggerUi, swaggerUiOptions);

// Dependency injection
const BookRepositoryInstance = new BookRepository(AppDataSource);
const BookServiceInstance = new BookServiceImpl(BookRepositoryInstance);
const LibrarySericeInstance = new LibraryServiceImpl(BookServiceInstance);
const LibraryHandlerInstance = new LibraryHandler(LibrarySericeInstance);
const MainHandlerInstance = new MainHandler(LibraryHandlerInstance);

const startServer = async () => {
    await Connection().catch((err) => {
        console.error(err);
        process.exit(1);
    });
    await server.register(MainHandlerInstance.registerRoutes);
    const appHost = process.env['APP_HOST'];
    const host = appHost || '0.0.0.0';
    await server.listen({ host: host, port: 8080 }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
    await server.ready();
    server.swagger();
};
startServer();
