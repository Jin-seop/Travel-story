import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Timestamp,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    tag: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    create_time: Timestamp;

    @ManyToOne(() => User, (user) => user.contents)
    user: User;
}
