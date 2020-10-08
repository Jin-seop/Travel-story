import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class Image1602125890172 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'image',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                    },
                    {
                        name: 'imgName',
                        type: 'varchar',
                    },
                ],
            }),
            true
        );
        await queryRunner.createForeignKey(
            'image',
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
