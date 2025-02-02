import { UpdateBookRequest } from "../dto/books";
import { SearchAndPaginationRequest } from "../dto/pagination";
import { Book } from "../model/books";
import { BookServiceInterface } from "./books";

export interface LibraryServiceInterface extends BookServiceInterface {
}

export class LibraryServiceImpl implements LibraryServiceInterface {
    private bookService: BookServiceInterface;

    constructor(bookService: BookServiceInterface) {
        this.bookService = bookService;
    }

    GetBooks = (searchAndPaginationRequest: SearchAndPaginationRequest) => {
        return this.bookService.GetBooks(searchAndPaginationRequest);
    }

    CreateBook = (book: any) => {
        return this.bookService.CreateBook(book);
    }

    GetBookById = (id: string): Promise<Book | null> => {
        return this.bookService.GetBookById(id);
    }

    UpdateBookById(id: string, updateBookRequest: UpdateBookRequest): Promise<Book> {
        return this.bookService.UpdateBookById(id, updateBookRequest);
    }

    RemoveBookById(id: string): Promise<void> {
        return this.bookService.RemoveBookById(id);
    }
}
