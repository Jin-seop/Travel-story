import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
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
        await queryRunner.addColumn(
            'tag',
            new TableColumn({
                name: 'contentTagId',
                type: 'int',
            })
        );

        await queryRunner.createForeignKey(
            'tag',
            new TableForeignKey({
                columnNames: ['contentTagId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'content',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
