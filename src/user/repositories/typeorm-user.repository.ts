import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../shared/interfaces/IUserRepository';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  async create(data: Omit<UserEntity, 'id'>): Promise<void> {
    await this.repository.insert(data);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findByName(name: string): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: { name },
    });
  }

  async updateById(
    id: number,
    data: Partial<Omit<UserEntity, 'id'>>,
  ): Promise<void> {
    await this.repository.update({ id }, data);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete({ id });
  }
}
