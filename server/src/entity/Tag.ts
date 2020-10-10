import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Content } from './Content';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tagName: string;

    @ManyToOne(() => Content, (content) => content.tags, {
        onDelete: 'CASCADE',
    })
    content: Content;
}
