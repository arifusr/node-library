import { IsString, IsNumber, IsArray } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { extend } from 'fp-ts';

export interface BookDTO {
    title: string;
    author: string;
    publishedYear: number;
    genres: string[];
    stock: number;
}

export interface CreateBookRequestInterface {
    title: string;
    author: string;
    publishedYear: number;
    genres: string[];
    stock: number;
}

export class CreateBookRequest implements CreateBookRequestInterface  {
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

    constructor(title: string, author: string, publishedYear: number, genres: string[], stock: number) {
        this.title = title;
        this.author = author;
        this.publishedYear = publishedYear;
        this.genres = genres;
        this.stock = stock;
    }
}


export async function validateCreateBookRequest(json: CreateBookRequest) : Promise<[ ...Assert<CreateBookRequest , boolean>]>{
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