import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnMetadata1639151722466 implements MigrationInterface {
    name = 'addColumnMetadata1639151722466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo_metadata" ADD "comment" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo_metadata" DROP COLUMN "comment"`);
    }

}
