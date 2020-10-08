import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class Tag1602125886920 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tag',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                    },
                    {
                        name: 'tagName',
                        type: 'varchar',
                    },
                ],
            }),
            true
        );
        await queryRunner.createForeignKey(
            'tag',
            new TableForeignKey({
                columnNames: ['contentId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'content',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
