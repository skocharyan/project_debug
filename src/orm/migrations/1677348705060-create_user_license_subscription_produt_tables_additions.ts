import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserLicenseSubscriptionProdutTablesAdditions1677348705060
  implements MigrationInterface
{
  name = 'createUserLicenseSubscriptionProdutTablesAdditions1677348705060';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "UQ_1de6a4421ff0c410d75af27aeee"`
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "product_id"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "product_id" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "UQ_1de6a4421ff0c410d75af27aeee" UNIQUE ("product_id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "UQ_1de6a4421ff0c410d75af27aeee"`
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "product_id"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "product_id" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "UQ_1de6a4421ff0c410d75af27aeee" UNIQUE ("product_id")`
    );
  }
}
