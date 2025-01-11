import { IsString, IsNumber, IsArray } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Book } from '../model/books';
import { v4 as uuidv4 } from 'uuid';

export interface BookDTO {
    title: string;
    author: string;
    publishedYear: number;
    genres: string[];
    stock: number;
}

export interface CreateBookRequestInterface extends BookDTO {}

export class CreateBookRequest implements CreateBookRequestInterface {
    @IsString()
    title: string;

    @IsString()
    author: string;

    @IsNumber()
    publishedYear: number;

    @IsArray()
    @IsString({ each: true })
    genres: string[];

    @IsNumber()
    stock: number;

    constructor(
        title: string,
        author: string,
        publishedYear: number,
        genres: string[],
        stock: number
    ) {
        this.title = title;
        this.author = author;
        this.publishedYear = publishedYear;
        this.genres = genres;
        this.stock = stock;
    }

    toEntity(): Book {
        return new Book({id: uuidv4(), ...this});
    }
}

export async function validateCreateBookRequest(
    json: CreateBookRequest
): Promise<[...Assert<CreateBookRequest, boolean>]> {
    const book = plainToInstance(CreateBookRequest, json);
    const errors = await validate(book);

    if (errors.length > 0) {
        console.log('Validation failed. Errors:', errors);
        return [undefined, false];
    } else {
        console.log('Validation succeeded');
        return [book, true];
    }
}

export class UpdateBookRequest extends CreateBookRequest {}

export async function validateUpdateBookRequest(
    json: UpdateBookRequest
): Promise<[...Assert<UpdateBookRequest, boolean>]> {
    const book = plainToInstance(UpdateBookRequest, json);
    const errors = await validate(book);

    if (errors.length > 0) {
        console.log('Validation failed. Errors:', errors);
        return [undefined, false];
    } else {
        console.log('Validation succeeded');
        return [book, true];
    }
}

export interface BookPaginationDTO {
    page: number;
    totalPages: number;
    totalBooks: number;
}