import { BookDTO, CreateBookRequest, UpdateBookRequest } from '../dto/books';
import { BookRepositoryInterface } from '../repository/book';
import { Book } from '../model/books';

export interface BookServiceInterface {
    GetBooks(): Promise<Book[]>;
    CreateBook(book: CreateBookRequest): Promise<void>;
    GetBookById(id: string): Promise<Book | null>;
    UpdateBookById(
        id: string,
        updateBookRequest: UpdateBookRequest
    ): Promise<Book>;
    RemoveBookById(id: string): Promise<void>;
}

export class BookServiceImpl implements BookServiceInterface {
    private books: BookDTO[] = [];
    bookRepository: BookRepositoryInterface;

    constructor(bookRepository: BookRepositoryInterface) {
        this.bookRepository = bookRepository;
    }

    GetBooks = async (): Promise<Book[]> => {
        const books = await this.bookRepository.GetAllBooks();
        return books;
    };

    CreateBook = async (book: CreateBookRequest): Promise<void> => {
        // DTO to Entity
        const entity = book.toEntity();
        await this.bookRepository.CreateNewBook(entity);
    };

    GetBookById = async (id: string): Promise<Book | null> => {
        const book = await this.bookRepository.GetBookById(id);
        return book;
    };

    RemoveBookById = async (id: string): Promise<void> => {
        return this.bookRepository.DeleteBookById(id);
    };

    UpdateBookById = async (
        id: string,
        updateBookRequest: UpdateBookRequest
    ): Promise<Book> => {
        // get the book
        const book = await this.GetBookById(id);
        if (!book) {
            throw new CustomError('Book not found', 404);
        }
        // DTO to Entity
        const entity = updateBookRequest.toEntity();
        entity.id = id;
        try {
            await this.bookRepository.UpdateBook(entity);
            return entity;
        } catch (e) {
            throw e;
        }
    };
}
