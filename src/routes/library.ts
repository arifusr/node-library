import { FastifyInstance } from 'fastify';
import { LibraryServiceInterface } from '../domain/library/service/main';
import { CreateBookRequest, validateCreateBookRequest } from '../domain/library/dto/books';


export class LibraryHandler {
    private libraryService: LibraryServiceInterface;

    constructor(libraryService: LibraryServiceInterface) {
        this.libraryService = libraryService;
    }

    registerRoutes = (server: FastifyInstance) : void => {
        server.post('/books', async (request, reply) => {
            // Validate request
            const [createBookRequest, ok] = await validateCreateBookRequest(request.body as CreateBookRequest)
            if (!ok) {
                reply.code(400).send("Invalid request")
                return
            }
            // call the service
            this.libraryService.CreateBook(createBookRequest)
            return "aaa";
        });
        server.get('/books', async (request, reply) => {
            return this.libraryService.GetBooks();
        });

        server.get('/books/:id', async (request, reply) => {
            const { id } = request.params as { id: string };
            return this.libraryService.GetBookById(id);
        });
    }
}