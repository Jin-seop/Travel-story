import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    Timestamp,
} from 'typeorm';
import { User } from './User';
import { Image } from './Image';
import { Tag } from './Tag';

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    created_at: Timestamp;

    @ManyToOne(() => User, (user) => user.contents, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    user: User;

    @OneToMany(() => Image, (image) => image.content, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    images!: Image[];

    @OneToMany(() => Tag, (tag) => tag.content, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    tags!: Tag[];
}
