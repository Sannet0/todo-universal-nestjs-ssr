import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {

  @PrimaryGeneratedColumn()
  id: string;

  @Column("text")
  text: string;

  @Column({ default: false })
  isCompleted: boolean;

}
