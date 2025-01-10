import fastify from 'fastify';
import { MainHandler } from './routes/main';
import { LibraryHandler } from './routes/library';
import { LibraryServiceImpl } from './domain/library/service/main';
import { BookServiceImpl } from './domain/library/service/books';
import { BookRepository } from './domain/library/repository/book';
import AppDataSource, { Connection } from './infras/postgreSql';

const server = fastify();

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
    server.register(MainHandlerInstance.registerRoutes);
    await server.listen({ port: 8080 }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
};
startServer();
