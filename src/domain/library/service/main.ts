import { Book } from "../model/books";
import { BookServiceInterface } from "./books";

export interface LibraryServiceInterface extends BookServiceInterface {
}

export class LibraryServiceImpl implements LibraryServiceInterface {
    private bookService: BookServiceInterface;

    constructor(bookService: BookServiceInterface) {
        this.bookService = bookService;
    }

    GetBooks = () => {
        return this.bookService.GetBooks();
    }

    CreateBook = (book: any) => {
        return this.bookService.CreateBook(book);
    }

    GetBookById = (id: string): Promise<Book | null> => {
        return this.bookService.GetBookById(id);
    }
}
