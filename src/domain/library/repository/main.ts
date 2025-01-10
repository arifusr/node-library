import { BookRepositoryInterface } from './book';
import { Book } from '../model/books';

export interface LibraryRepositoryInterface extends BookRepositoryInterface {
}

export class LibraryRepository implements LibraryRepositoryInterface {
    private bookRepository: BookRepositoryInterface;

    constructor(bookRepository: BookRepositoryInterface) {
        this.bookRepository = bookRepository;
    }

    CreateNewBook = async (book: Book) => {
        await this.bookRepository.CreateNewBook(book);
    }

    GetAllBooks = async () => {
        return await this.bookRepository.GetAllBooks();
    }

    GetBookById = async (id: string): Promise<Book | null> => {
        return await this.bookRepository.GetBookById(id);
    }

    UpdateBook =  async (book: Book): Promise<void> => {
        await this.bookRepository.UpdateBook(book);
    }
}
