import { BookDTO, CreateBookRequest } from '../dto/books';
import { BookRepositoryInterface } from '../repository/book';
import { Book } from '../model/books';

export interface BookServiceInterface {
    GetBooks(): Promise<Book[]>;
    CreateBook(book: CreateBookRequest): void;
    GetBookById(id: string): Promise<Book | null>;
    // removeBook(title: string): void;
    // updateBook(book: BookDTO): void;
}

export class BookServiceImpl implements BookServiceInterface {
    private books: BookDTO[] = [];
    bookRepository: BookRepositoryInterface;

    constructor(bookRepository: BookRepositoryInterface) {
        this.bookRepository = bookRepository;
    }

    GetBooks = async(): Promise<Book[]> => {
        const books = await this.bookRepository.GetAllBooks();
        return books
    };

    CreateBook = async (book: CreateBookRequest): Promise<void> => {
        // DTO to Entity
        const entity = book.toEntity();
        await this.bookRepository.CreateNewBook(entity);
    };

    GetBookById = async (id: string): Promise<Book | null> => {
        const book = await this.bookRepository.GetBookById(id);
        return book
    }

    removeBook(title: string): void {
        this.books = this.books.filter((book) => book.title !== title);
    }

    updateBook(book: BookDTO): void {
        this.books = this.books.map((b) => (b.title === book.title ? book : b));
    }
}
