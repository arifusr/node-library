import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableBook1736490471877 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`CREATE TABLE "book" (
            "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            "title" VARCHAR(255) NOT NULL,
            "author" VARCHAR(255) NOT NULL,
            "publishedYear" INT NOT NULL,
            "genres" TEXT[] NOT NULL,
            "stock" INT NOT NULL,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            "deletedAt" TIMESTAMP )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "book"`);
    }
}
