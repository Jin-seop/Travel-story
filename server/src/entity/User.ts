import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Content } from './Content';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Content, (content) => content.user, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    contents: Content[];
}
