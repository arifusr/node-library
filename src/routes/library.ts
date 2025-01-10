import { FastifyInstance } from 'fastify';
import { LibraryServiceInterface } from '../domain/library/service/main';
import {
    CreateBookRequest,
    validateCreateBookRequest,
    validateUpdateBookRequest,
} from '../domain/library/dto/books';
import HandleCustomError from '../helpers/error/handlerCustomError';

export class LibraryHandler {
    private libraryService: LibraryServiceInterface;

    constructor(libraryService: LibraryServiceInterface) {
        this.libraryService = libraryService;
    }

    registerRoutes = (server: FastifyInstance): void => {
        server.post('/books', async (request, reply) => {
            // Validate request
            const [createBookRequest, ok] = await validateCreateBookRequest(
                request.body as CreateBookRequest
            );
            if (!ok) {
                reply.code(400).send('Invalid request');
                return;
            }
            // call the service
            try {
                await this.libraryService.CreateBook(createBookRequest);
                reply.code(201).send();
            } catch (e) {
                HandleCustomError(e, reply);
            }
        });
        server.get('/books', async (request, reply) => {
            try {
                return await this.libraryService.GetBooks();
            } catch (e) {
                HandleCustomError(e, reply);
            }
        });

        server.get('/books/:id', async (request, reply) => {
            const { id } = request.params as { id: string };
            try {
                const book = await this.libraryService.GetBookById(id);
                if (!book) {
                    reply.code(404).send('Book not found');
                    return;
                }
                return book;
            } catch (e) {
                HandleCustomError(e, reply);
            }
        });

        server.put('/books/:id', async (request, reply) => {
            const { id } = request.params as { id: string };
            // Validate request
            const [updateBookRequest, ok] = await validateUpdateBookRequest(
                request.body as CreateBookRequest
            );
            if (!ok) {
                reply.code(400).send('Invalid request');
                return;
            }
            // call the service
            try {
                const book = this.libraryService.UpdateBookById(
                    id,
                    updateBookRequest
                );
                reply.code(204).send(book);
            } catch (e) {
                HandleCustomError(e, reply);
            }
        });

        server.delete('/books/:id', async (request, reply) => {
            const { id } = request.params as { id: string };
            // call the service
            try {
                await this.libraryService.RemoveBookById(id);
                reply.code(204).send();
            } catch (e) {
                HandleCustomError(e, reply);
            }
        });
    };
}
