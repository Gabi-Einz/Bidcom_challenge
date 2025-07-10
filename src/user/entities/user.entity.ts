import { MaskEntity } from '../../mask/entities/mask.entity';
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

  @OneToMany(() => MaskEntity, (mask) => mask.user)
  masks: MaskEntity[];
}
