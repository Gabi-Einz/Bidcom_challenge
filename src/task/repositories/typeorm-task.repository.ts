import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { ITaskRepository } from 'src/shared/interfaces/ITaskRepository';

export class TypeOrmTaskRepository implements ITaskRepository<TaskEntity> {
  constructor(
    @InjectRepository(TaskEntity) private repository: Repository<TaskEntity>,
  ) {}

  async create(entity: TaskEntity): Promise<TaskEntity> {
    await this.repository.insert(entity);
    return entity;
  }

  async createMany(data: Omit<TaskEntity, 'id'>[]): Promise<void> {
    await this.repository.save(data);
  }

  async findAllByUserId(userId: number): Promise<TaskEntity[]> {
    return await this.repository.find({
      where: { user: { id: userId } },
    });
  }

  async findOneByIdAndUserId(
    id: number,
    userId: number,
  ): Promise<TaskEntity | null> {
    return this.repository.findOne({
      where: { id, user: { id: userId } },
    });
  }

  async findOneById(id: number): Promise<TaskEntity | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async updateById(
    id: number,
    data: Partial<Omit<TaskEntity, 'id'>>,
  ): Promise<void> {
    await this.repository.update({ id }, data);
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete({ id });
  }
}
