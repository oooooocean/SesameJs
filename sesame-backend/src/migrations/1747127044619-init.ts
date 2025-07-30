import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1747127044619 implements MigrationInterface {
    name = 'Init1747127044619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`file\` CHANGE \`createAt\` \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`file\` CHANGE \`createAt\` \`createAt\` datetime(0) NOT NULL`);
    }

}
