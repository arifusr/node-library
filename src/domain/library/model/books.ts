import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';
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

    @Column("simple-array", { array: true })
    genres: string[];

    @Column()
    stock: number;

    @DeleteDateColumn() 
    deletedAt?: Date;

    constructor(obj: Book) {
        this.id = '';
        this.title = '';
        this.author = '';
        this.publishedYear = 0;
        this.genres = [];
        this.stock = 0;
        if (obj) {
            this.id = obj.id;
            this.title = obj.title;
            this.author = obj.author;
            this.publishedYear = obj.publishedYear;
            this.genres = obj.genres;
            this.stock = obj.stock;
        }
    }
}
