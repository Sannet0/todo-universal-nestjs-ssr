import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { List } from './list.entity';
import { Task } from './task.entity';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @OneToMany(() => List, list => list.user, { eager: true, cascade: true})
  lists: List[];

  @OneToMany(() => Task, task => task.list, { eager: true, cascade: true})
  tasks: Task[];

}
