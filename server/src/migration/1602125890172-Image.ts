import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
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
                        isGenerated : true,
                        generationStrategy : 'increment'
                    },
                    {
                        name: 'imgName',
                        type: 'varchar',
                    },
                ],
            }),
            true
        );
        await queryRunner.addColumn(
            'image',
            new TableColumn({
                name: 'contentImgId',
                type: 'int',
            })
        );

        await queryRunner.createForeignKey(
            'image',
            new TableForeignKey({
                columnNames: ['contentImgId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'content',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
