import { FastifyInstance } from 'fastify';
import {LibraryHandler} from './library';

export class MainHandler {
    libraryhandler: LibraryHandler;

    constructor(libraryhandler: LibraryHandler) {
        this.libraryhandler = libraryhandler;
    }

    registerRoutes: (server: FastifyInstance) => void = (server: FastifyInstance) => {
        server.register(this.libraryhandler.registerRoutes);
    }
}