import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    publishedYear: number;

    @Column("simple-array")
    genres: string[];

    @Column()
    stock: number;

    constructor(id: string, title: string, author: string, publishedYear: number, genres: string[], stock: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publishedYear = publishedYear;
        this.genres = genres;
        this.stock = stock;
    }
}

