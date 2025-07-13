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
import { DateUtils } from 'src/shared/utils/date.utils';
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
  async findOneOriginUrl(code: string, password: string): Promise<string> {
    const maskedLink = password
      ? `${safeGetConfig('BASE_URL')}/l/${code}?password=${password}`
      : `${safeGetConfig('BASE_URL')}/l/${code}`;
    const maskEntity: Partial<MaskEntity> | null =
      await this.iMaskRepository.findOneOriginUrl(maskedLink);
    if (!maskEntity || !maskEntity.valid) {
      throw new NotFoundException('Not found');
    }
    const { id, redirectAmount, expiresAt } = maskEntity;
    const offsetArgentinaHours: number = -3;
    const currentDate: Date =
      DateUtils.getCurrentDateByUTCoffset(offsetArgentinaHours);
    if (expiresAt && currentDate.getTime() > expiresAt.getTime()) {
      await this.iMaskRepository.invalidate(id!, false);
      throw new BadRequestException('The link is expired');
    }
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
    const { url, password, expiresAt } = createTaskDto;
    const isValid: boolean =
      this.iUrlService.isValidFormat(url) &&
      (await this.iUrlService.isValidDomain(url));
    const maskEntity: MaskEntity = new MaskEntity();
    maskEntity.link = this.build(password);
    maskEntity.valid = isValid;
    maskEntity.target = createTaskDto.url;
    maskEntity.redirectAmount = 0;
    maskEntity.expiresAt = expiresAt ? new Date(expiresAt) : null;
    maskEntity.user = user;
    const result = await this.iMaskRepository.create(maskEntity);
    return result;
  }
  build = (password: string | undefined): string => {
    const bytesSize = 4;
    const code: string = randomBytes(bytesSize).toString('base64url');
    const maskedUrl = `${safeGetConfig('BASE_URL')}/l/${code}`;
    return password ? maskedUrl.concat(`?password=${password}`) : maskedUrl;
  };
}
