import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaskController } from './mask.controller';
import { MaskEntity } from './entities/mask.entity';
import { MaskService } from './services/mask.service';
import { TypeOrmMaskRepository } from './repositories/type-orm-mask.repository';
import { UrlService } from './services/url.service';

@Module({
  imports: [TypeOrmModule.forFeature([MaskEntity])],
  controllers: [MaskController],
  providers: [
    MaskService,
    {
      provide: 'IMaskRepository',
      useClass: TypeOrmMaskRepository,
    },
    {
      provide: 'IUrlService',
      useClass: UrlService,
    },
  ],
})
export class MaskModule {}
