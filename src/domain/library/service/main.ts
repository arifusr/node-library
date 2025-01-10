import { BookServiceInterface } from "./books";

export interface LibraryServiceInterface {
    BookService: BookServiceInterface;
}

export class LibraryServiceImpl implements LibraryServiceInterface {
    constructor(public BookService: BookServiceInterface) {}
}
