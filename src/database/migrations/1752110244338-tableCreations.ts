import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableCreations1752110244338 implements MigrationInterface {
  name = 'TableCreations1752110244338';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`mask\` (\`id\` int NOT NULL AUTO_INCREMENT, \`target\` varchar(255) NOT NULL, \`link\` varchar(255) NOT NULL, \`valid\` tinyint NOT NULL, \`redirect_amount\` int NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mask\` ADD CONSTRAINT \`FK_869f0e418f110acefc319d5dd26\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mask\` DROP FOREIGN KEY \`FK_869f0e418f110acefc319d5dd26\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`mask\``);
  }
}
