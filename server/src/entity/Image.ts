import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Content } from './Content';

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imgName: string;

    @ManyToOne(() => Content, (content) => content.images)
    content: Content;
}
