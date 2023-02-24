import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAndDeepGrameTables1677171888866 implements MigrationInterface {
  name = 'UserAndDeepGrameTables1677171888866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying, "last_name" character varying, "middle_name" character varying, "email" character varying NOT NULL, "password" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "deep_gram_id" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_add56fb566f8773976de1c6852" UNIQUE ("deep_gram_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_add56fb566f8773976de1c6852f" FOREIGN KEY ("deep_gram_id") REFERENCES "deepgram"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_add56fb566f8773976de1c6852f"`
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
