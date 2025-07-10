import { UserEntity } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('mask')
export class MaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'target' })
  target: string;

  @Column({ name: 'link' })
  link?: string;

  @Column({ name: 'valid' })
  valid: boolean;

  @Column({ name: 'redirect_amount', default: 0 })
  redirectAmount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.masks, { nullable: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;
}
