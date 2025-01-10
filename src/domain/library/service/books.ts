import { BookDTO, CreateBookRequest, UpdateBookRequest } from '../dto/books';
import { BookRepositoryInterface } from '../repository/book';
import { Book } from '../model/books';

export interface BookServiceInterface {
    GetBooks(): Promise<Book[]>;
    CreateBook(book: CreateBookRequest): Promise<void>;
    GetBookById(id: string): Promise<Book | null>;
    UpdateBookById(id: string, updateBookRequest: UpdateBookRequest): Promise<void>;

    // removeBook(title: string): void;
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

    removeBook(title: string): void {
        this.books = this.books.filter((book) => book.title !== title);
    }

    UpdateBookById =  async (id: string, updateBookRequest: UpdateBookRequest): Promise<void> => {
        // DTO to Entity
        const entity = updateBookRequest.toEntity();
        entity.id = id;
        await this.bookRepository.UpdateBook(entity);
    }
}