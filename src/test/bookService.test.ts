import { BookServiceImpl } from '../domain/library/service/books';
import { BookDTO, CreateBookRequest } from '../domain/library/dto/books';
import { BookRepositoryInterface } from '../domain/library/repository/book';
import { Book } from '../domain/library/model/books';

class MockBookRepository implements BookRepositoryInterface {
    private books: Book[] = [];

    async CreateNewBook(book: Book): Promise<void> {
        this.books.push(book);
    }

    async GetAllBooks(): Promise<Book[]> {
        return this.books;
    }

    async GetBookById(id: string): Promise<Book | null> {
        const book = this.books.find((book) => book.id === id);
        return book || null;
    }

    async UpdateBook(book: Book): Promise<void> {
        const index = this.books.findIndex((b) => b.id === book.id);
        if (index !== -1) {
            this.books[index] = book;
        }
    }

    async DeleteBookById(id: string): Promise<void> {
        this.books = this.books.filter((book) => book.id !== id);
    }
}

describe('BookServiceImpl', () => {
    let bookService: BookServiceImpl;
    let mockBookRepository: MockBookRepository;

    beforeEach(() => {
        mockBookRepository = new MockBookRepository();
        bookService = new BookServiceImpl(mockBookRepository);
    });

    it('should return all books', async () => {
        const books = await bookService.GetBooks();
        expect(books).toHaveLength(0);
    });

    it('should add a new book', async () => {
        const newBook: CreateBookRequest = new CreateBookRequest(
            'New Book',
            'New Author',
            2022,
            ['Drama'],
            5
        );
        await bookService.CreateBook(newBook);
        const books = await bookService.GetBooks();
        expect(books).toHaveLength(1);
        expect(books).toEqual(expect.objectContaining(books));
    });

    it('should get a book by id', async () => {
        const newBook: CreateBookRequest = new CreateBookRequest(
            'New Book',
            'New Author',
            2022,
            ['Drama'],
            5
        );
        await bookService.CreateBook(newBook);
        const books = await bookService.GetBooks();
        const createdBook = books[0]
        const book = await bookService.GetBookById(createdBook.id);
        expect(book).toEqual(expect.objectContaining(createdBook));
    });

    it('should update a book by id', async () => {
        const newBook: CreateBookRequest = new CreateBookRequest(
            'New Book',
            'New Author',
            2022,
            ['Drama'],
            5
        );
        await bookService.CreateBook(newBook);
        const books = await bookService.GetBooks();
        const createdBook = books[0]
        const updatedBook: CreateBookRequest = new CreateBookRequest(
            'Updated Book',
            'Updated Author',
            2023,
            ['Thriller'],
            10
        );
        await bookService.UpdateBookById(createdBook.id, updatedBook);
        const book = await bookService.GetBookById(createdBook.id);
        expect(book).toEqual(expect.objectContaining(updatedBook));
    });

    it('should remove a book by id', async () => {
        const newBook: CreateBookRequest = new CreateBookRequest(
            'New Book',
            'New Author',
            2022,
            ['Drama'],
            5
        );
        await bookService.CreateBook(newBook);
        const beforeDeletedBooks = await bookService.GetBooks();
        await bookService.RemoveBookById(beforeDeletedBooks[0].id);
        const afterDeletedBooks = await bookService.GetBooks();
        expect(afterDeletedBooks).toHaveLength(beforeDeletedBooks.length - 1);
    });
});
