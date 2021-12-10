import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAuthorModel1639157168213 implements MigrationInterface {
    name = 'AddAuthorModel1639157168213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" ADD "authorId" uuid`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_c073d197b41cfbeb09835ca233c" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_c073d197b41cfbeb09835ca233c"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "authorId"`);
    }

}
