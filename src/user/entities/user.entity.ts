import { TaskEntity } from '../../task/entities/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  name?: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];
}
