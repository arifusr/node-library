import { Book } from "../model/books";
import { Repository, DataSource } from 'typeorm';


export interface BookRepositoryInterface {
    CreateNewBook(book: Book): Promise<void>;
    GetAllBooks(): Promise<Book[]>;
    GetBookById(id: string): Promise<Book | null>;
    UpdateBook(book: Book): Promise<void>;
}

export class BookRepository implements BookRepositoryInterface {
    private Repository: Repository<Book>;
    constructor(datasource: DataSource) {
        this.Repository = datasource.getRepository(Book);
    }

    CreateNewBook = async (book: Book) => {
        try {
            const result = await this.Repository.save(book);
            console.log(result);
        }catch(e){
            console.log(e);
        }
    }

    GetAllBooks = async() : Promise<Book[]> => {
        try {
            const result = await this.Repository.find();
            return result;
        } catch(e) {
            console.log(e);
            return [];
        }
    }

    GetBookById = async (id: string): Promise<Book | null> => {
        const result = await this.Repository.findOneBy({id: id});
        return result;
    }

    UpdateBook =  async (book: Book): Promise<void> => {
        await this.Repository.save(book);
    }
}
