import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MaskCreationRequestDto } from './models/mask-creation-request.dto';
import { MaskEntity } from './entities/mask.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { IMaskRepository } from './interfaces/imask.repository';

@Injectable()
export class MaskService {
  constructor(
    @Inject('IMaskRepository')
    private iMaskRepository: IMaskRepository<MaskEntity>,
  ) {}

  async findOneByIdAndUserId(taskId: number, userId: number) {
    const task = await this.iMaskRepository.findOneByIdAndUserId(
      taskId,
      userId,
    );
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async create(createTaskDto: MaskCreationRequestDto, user: UserEntity) {
    const maskEntity: MaskEntity = new MaskEntity();
    maskEntity.link = 'enmaskedLink.com';
    maskEntity.valid = true;
    maskEntity.target = createTaskDto.url;
    maskEntity.redirectAmount = 0;
    maskEntity.user = user;
    const result = await this.iMaskRepository.create(maskEntity);
    return result;
  }
}
