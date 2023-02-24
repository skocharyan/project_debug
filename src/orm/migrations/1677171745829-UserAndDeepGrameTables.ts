import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAndDeepGrameTables1677171745829 implements MigrationInterface {
  name = 'UserAndDeepGrameTables1677171745829';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_add56fb566f8773976de1c6852f"`
    );
    await queryRunner.query(
      `CREATE TABLE "deepgram" ("id" SERIAL NOT NULL, "key_id" character varying NOT NULL, "key" character varying NOT NULL, CONSTRAINT "UQ_cbe001389afee488804bc376256" UNIQUE ("key_id"), CONSTRAINT "UQ_72422090e4931e865fd0f065901" UNIQUE ("key"), CONSTRAINT "PK_6cb24f70e4b9f1969ee8bce5928" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_fc283fee4f4e9c467b434199258"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "key_id"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_7b57429bcc6c6265ddd4e92f063"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "key"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_add56fb566f8773976de1c6852f" FOREIGN KEY ("deep_gram_id") REFERENCES "deepgram"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_add56fb566f8773976de1c6852f"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "key" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_7b57429bcc6c6265ddd4e92f063" UNIQUE ("key")`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "key_id" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_fc283fee4f4e9c467b434199258" UNIQUE ("key_id")`
    );
    await queryRunner.query(`DROP TABLE "deepgram"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_add56fb566f8773976de1c6852f" FOREIGN KEY ("deep_gram_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
