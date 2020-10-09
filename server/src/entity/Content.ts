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
    create_time!: Timestamp;

    @ManyToOne(() => User, (user) => user.contents)
    user: User;

    @OneToMany(() => Image, (image) => image.content)
    images!: Image[];

    @OneToMany(() => Tag, (tag) => tag.content)
    tags!: Tag[];
}
