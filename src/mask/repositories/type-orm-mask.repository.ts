import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaskEntity } from '../entities/mask.entity';
import { IMaskRepository } from '../interfaces/imask.repository';

export class TypeOrmMaskRepository implements IMaskRepository<MaskEntity> {
  constructor(
    @InjectRepository(MaskEntity) private repository: Repository<MaskEntity>,
  ) {}

  async create(entity: MaskEntity): Promise<MaskEntity> {
    await this.repository.insert(entity);
    return entity;
  }

  async findOneByIdAndUserId(
    id: number,
    userId: number,
  ): Promise<MaskEntity | null> {
    return this.repository.findOne({
      where: { id, user: { id: userId } },
    });
  }
}
