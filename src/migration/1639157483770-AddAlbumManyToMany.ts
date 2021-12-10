import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAlbumManyToMany1639157483770 implements MigrationInterface {
    name = 'AddAlbumManyToMany1639157483770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album_photos_photo" ("albumId" uuid NOT NULL, "photoId" uuid NOT NULL, CONSTRAINT "PK_d6508e57e194669e6b77bee307d" PRIMARY KEY ("albumId", "photoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fb5deea2817dea41af76b11fd1" ON "album_photos_photo" ("albumId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d292b18c5fbb585c8ddb959ea8" ON "album_photos_photo" ("photoId") `);
        await queryRunner.query(`ALTER TABLE "album_photos_photo" ADD CONSTRAINT "FK_fb5deea2817dea41af76b11fd15" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "album_photos_photo" ADD CONSTRAINT "FK_d292b18c5fbb585c8ddb959ea81" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album_photos_photo" DROP CONSTRAINT "FK_d292b18c5fbb585c8ddb959ea81"`);
        await queryRunner.query(`ALTER TABLE "album_photos_photo" DROP CONSTRAINT "FK_fb5deea2817dea41af76b11fd15"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d292b18c5fbb585c8ddb959ea8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb5deea2817dea41af76b11fd1"`);
        await queryRunner.query(`DROP TABLE "album_photos_photo"`);
        await queryRunner.query(`DROP TABLE "album"`);
    }

}
