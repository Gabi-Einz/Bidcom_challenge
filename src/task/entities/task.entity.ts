import { UserEntity } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description', nullable: true })
  description?: string;

  @Column({ name: 'completed' })
  completed: boolean;

  @Column({ name: 'priority' })
  priority: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { nullable: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;

  @Column({ name: 'user_id', nullable: true })
  userId?: number;
}
