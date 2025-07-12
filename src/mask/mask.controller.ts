import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  Res,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/authentication/jwt/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/authorization/guards/role.guard';
import { Roles } from 'src/auth/authorization/decorators/role.decorator';
import { Role } from 'src/auth/authorization/enums/role.enum';
import { HttpStatusCode } from 'src/shared/enums/http-status-code.enum';
import { SkipThrottle } from '@nestjs/throttler';
import { CurrentUser } from 'src/auth/decorators/auth.decorator';
import { MaskCreationRequestDto } from './models/mask-creation-request.dto';
import { MaskService } from './services/mask.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { Response } from 'express';

@SkipThrottle()
@Controller()
export class MaskController {
  constructor(private readonly MaskService: MaskService) {}

  @Post('masks')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatusCode.CREATED)
  @Roles([Role.ADMIN, Role.USER])
  async create(
    @Body() request: MaskCreationRequestDto,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.MaskService.create(request, user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatusCode.OK)
  @Roles([Role.ADMIN, Role.USER])
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.MaskService.findOneByIdAndUserId(id, user.id);
  }

  @Get('l/:code')
  @HttpCode(HttpStatusCode.OK)
  @Roles([Role.ADMIN, Role.USER])
  async redirect(@Param('code') code: string, @Res() response: Response) {
    const originUrl: string = await this.MaskService.findOneOriginUrl(code);
    return response.redirect(originUrl);
  }
}
