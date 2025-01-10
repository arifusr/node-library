import * as t from 'io-ts';
import { FastifyInstance } from 'fastify';
import { LibraryServiceInterface } from '../domain/library/service/main';
import { CreateBookRequest, validateCreateBookRequest } from '../domain/library/dto/books';


export class LibraryHandler {
    libraryService: LibraryServiceInterface;

    constructor(libraryService: LibraryServiceInterface) {
        this.libraryService = libraryService;
    }

    registerRoutes: (server: FastifyInstance) => void = (server: FastifyInstance) => {
        server.post('/books', async (request, reply) => {
            // Validate request
            const [createBookRequest, ok] = await validateCreateBookRequest(request.body as CreateBookRequest)
            if (!ok) {
                reply.code(400).send("Invalid request")
                return
            }
            // call the service
            this.libraryService.BookService.createBook(createBookRequest)
            return "aaa";
        });
        server.get('/books', async (request, reply) => {
            return this.libraryService.BookService.getBooks();
        });
    }
}