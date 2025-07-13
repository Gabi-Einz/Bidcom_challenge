import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExpiresAtColumnAddedToMaskTable1752369728838
  implements MigrationInterface
{
  name = 'ExpiresAtColumnAddedToMaskTable1752369728838';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mask\` ADD \`expires_at\` datetime NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`mask\` DROP COLUMN \`expires_at\``);
  }
}
