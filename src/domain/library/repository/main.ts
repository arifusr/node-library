import { BookRepositoryInterface } from './book';
import { Book } from '../model/books';
import { SearchAndPaginationRequest } from '../dto/pagination';

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

    GetAllBooks = async (searchAndPaginationRequest: SearchAndPaginationRequest) => {
        return await this.bookRepository.GetAllBooks(searchAndPaginationRequest);
    }

    GetBookById = async (id: string): Promise<Book | null> => {
        return await this.bookRepository.GetBookById(id);
    }

    UpdateBook =  async (book: Book): Promise<void> => {
        await this.bookRepository.UpdateBook(book);
    }

    DeleteBookById =  async (id: string): Promise<void> => {
        await this.bookRepository.DeleteBookById(id);
    }
}
