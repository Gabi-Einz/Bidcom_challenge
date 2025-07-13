import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MaskCreationRequestDto } from '../models/mask-creation-request.dto';
import { MaskEntity } from '../entities/mask.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { IMaskRepository } from '../interfaces/imask.repository';
import { IUrlService } from '../interfaces/iurl.service';
import { safeGetConfig } from 'src/shared/utils/ConfigHelper';
import { randomBytes } from 'crypto';
@Injectable()
export class MaskService {
  constructor(
    @Inject('IMaskRepository')
    private iMaskRepository: IMaskRepository<MaskEntity>,
    @Inject('IUrlService')
    private iUrlService: IUrlService,
  ) {}
  async findOneByIdAndUserId(maskId: number, userId: number) {
    const mask = await this.iMaskRepository.findOneByIdAndUserId(
      maskId,
      userId,
    );
    if (!mask) {
      throw new NotFoundException('Mask not found');
    }
    return mask;
  }
  async findOneOriginUrl(code: string): Promise<string> {
    const maskedLink = `${safeGetConfig('BASE_URL')}/l/${code}`;
    const maskEntity: Partial<MaskEntity> | null =
      await this.iMaskRepository.findOneOriginUrl(maskedLink);
    if (!maskEntity || !maskEntity.valid) {
      throw new NotFoundException('Not found');
    }
    const { id, redirectAmount } = maskEntity;
    await this.iMaskRepository.updateRedirectAmountById(
      id!,
      redirectAmount! + 1,
    );
    return maskEntity.target ?? '';
  }

  async update(id: number, user: UserEntity): Promise<void> {
    const maskEntity: Partial<MaskEntity> | null =
      await this.iMaskRepository.findOneByIdAndUserId(id, user.id);
    if (!maskEntity) {
      throw new NotFoundException('Not found');
    }
    if (!maskEntity.valid) {
      throw new BadRequestException('The link is already invalid');
    }
    await this.iMaskRepository.invalidate(id, false);
  }

  async create(createTaskDto: MaskCreationRequestDto, user: UserEntity) {
    const { url } = createTaskDto;
    const isValid: boolean =
      this.iUrlService.isValidFormat(url) &&
      (await this.iUrlService.isValidDomain(url));
    const maskEntity: MaskEntity = new MaskEntity();
    maskEntity.link = this.build();
    maskEntity.valid = isValid;
    maskEntity.target = createTaskDto.url;
    maskEntity.redirectAmount = 0;
    maskEntity.user = user;
    const result = await this.iMaskRepository.create(maskEntity);
    return result;
  }
  build = (): string => {
    const bytesSize = 4;
    const code: string = randomBytes(bytesSize).toString('base64url');
    return `${safeGetConfig('BASE_URL')}/l/${code}`;
  };
}
