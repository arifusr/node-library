import { BookPaginationDTO } from '../dto/books';
import { SearchAndPaginationRequest } from '../dto/pagination';
import { Book } from '../model/books';
import { Repository, DataSource, ILike } from 'typeorm';

export interface BookRepositoryInterface {
    CreateNewBook(book: Book): Promise<void>;
    GetAllBooks(
        searchAndPaginationRequset: SearchAndPaginationRequest
    ): Promise<[Book[], BookPaginationDTO]>;
    GetBookById(id: string): Promise<Book | null>;
    UpdateBook(book: Book): Promise<void>;
    DeleteBookById(id: string): Promise<void>;
}

export class BookRepository implements BookRepositoryInterface {
    private Repository: Repository<Book>;
    constructor(datasource: DataSource) {
        this.Repository = datasource.getRepository(Book);
    }

    CreateNewBook = async (book: Book) => {
        try {
            await this.Repository.save(book);
        } catch (e) {
            console.log(e);
        }
    };

    GetAllBooks = async ({
        search,
        page,
        limit = 10,
    }: SearchAndPaginationRequest): Promise<[Book[], BookPaginationDTO]> => {
        try {
            let buildQuery = {};
            if (search) {
                buildQuery = {
                    ...buildQuery,
                    where: [
                        { title: ILike(`%${search}%`) },
                        { author: ILike(`%${search}%`) },
                        { genres: ILike(`%${search}%`) },
                    ],
                };
            }
            if (page && limit) {
                buildQuery = {
                    ...buildQuery,
                    skip: (page - 1) * limit,
                    take: limit,
                };
            }
            const [data, total] =
                await this.Repository.findAndCount(buildQuery);
            return [
                data,
                {
                    page: page || 1,
                    totalPages: Math.floor(total / limit) + 1,
                    totalBooks: total,
                },
            ];
        } catch (e) {
            console.log(e);
            return [[], { page: 1, totalPages: 1, totalBooks: 0 }];
        }
    };

    GetBookById = async (id: string): Promise<Book | null> => {
        const result = await this.Repository.findOneBy({ id: id });
        return result;
    };

    UpdateBook = async (book: Book): Promise<void> => {
        await this.Repository.save(book);
    };

    DeleteBookById = async (id: string): Promise<void> => {
        await this.Repository.softDelete({ id: id });
    };
}
