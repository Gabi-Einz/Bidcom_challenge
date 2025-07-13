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

  async findOneOriginUrl(link: string): Promise<Partial<MaskEntity> | null> {
    return this.repository.findOne({
      select: ['id', 'target', 'redirectAmount', 'valid', 'expiresAt'],
      where: { link },
    });
  }

  async updateRedirectAmountById(id: number, newAmount: number): Promise<void> {
    await this.repository.update(id, { redirectAmount: newAmount });
  }
  async invalidate(id: number, valid: boolean): Promise<void> {
    await this.repository.update(id, { valid });
  }
}
