import { BookDTO, CreateBookRequest } from '../dto/books';

export interface BookServiceInterface {
    getBooks(): BookDTO[];
    createBook(book: CreateBookRequest): void;
    removeBook(title: string): void;
    updateBook(book: BookDTO): void;
}

export class BookServiceImpl implements BookServiceInterface {
    private books: BookDTO[] = [];

    constructor() {
        this.books.push(
            {
                title: 'Example Book 1',
                author: 'John Doe',
                publishedYear: 2021,
                genres: ['Fiction'],
                stock: 10,
            },
            {
                title: 'Example Book 2',
                author: 'Jane Smith',
                publishedYear: 2019,
                genres: ['Non-Fiction', 'Biography'],
                stock: 5,
            },
            {
                title: 'Example Book 3',
                author: 'Alice Johnson',
                publishedYear: 2020,
                genres: ['Science Fiction'],
                stock: 7,
            }
        );
    }

    getBooks = (): BookDTO[] => {
        return this.books;
    }

    createBook = (book: CreateBookRequest): void => {
        this.books.push(book);
    }

    removeBook(title: string): void {
        this.books = this.books.filter((book) => book.title !== title);
    }

    updateBook(book: BookDTO): void {
        this.books = this.books.map((b) => (b.title === book.title ? book : b));
    }
}
