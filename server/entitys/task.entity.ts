import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { List } from './list.entity';
import { User } from './user.entity';

@Entity('tasks')
export class Task {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => List, list => list.tasks)
  @JoinColumn({ name: 'listId', referencedColumnName: 'id' })
  list: List;

  @Column()
  listId: number;

  @ManyToOne(() => User, user => user.lists, { nullable: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column()
  userId: number;

}
