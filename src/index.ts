import fastify from 'fastify';
import {MainHandler} from './routes/main';
import {LibraryHandler} from './routes/library';
import { LibraryServiceImpl } from './domain/library/service/main';
import { BookServiceImpl } from './domain/library/service/books';


const server = fastify();

// Dependency injection
const bookServiceInstance = new BookServiceImpl();
let LibrarySericeInstance = new LibraryServiceImpl(bookServiceInstance);
let LibraryHandlerInstance = new LibraryHandler(LibrarySericeInstance);
let MainHandlerInstance = new MainHandler(LibraryHandlerInstance);

console.log(MainHandlerInstance)

server.register(MainHandlerInstance.registerRoutes);

server.listen({port: 8080}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});