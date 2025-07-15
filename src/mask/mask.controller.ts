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
  Put,
  Query,
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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { MaskCreationResponseDto } from './models/mask-creation-response.dto';
import { MaskStatsResponseDto } from './models/mask-stats-response.dto';

@ApiTags('masks')
@ApiBearerAuth()
@SkipThrottle()
@Controller()
export class MaskController {
  constructor(private readonly MaskService: MaskService) {}

  @Post('masks')
  @ApiOperation({
    summary: 'Create a new URL mask',
    description:
      'Creates a masked URL that redirects to the original URL. Optionally protected with password and expiration date.',
  })
  @ApiBody({
    type: MaskCreationRequestDto,
    description: 'Mask creation details',
  })
  @ApiCreatedResponse({
    description: 'Mask created successfully',
    type: MaskCreationResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatusCode.CREATED)
  @Roles([Role.ADMIN, Role.USER])
  async create(
    @Body() request: MaskCreationRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<MaskCreationResponseDto> {
    return MaskCreationResponseDto.build(
      await this.MaskService.create(request, user),
    );
  }

  @Put('masks/:id/invalidation')
  @ApiOperation({
    summary: 'Invalidate a mask',
    description:
      'Marks a mask as invalid, preventing further redirects. Only the mask owner can invalidate it.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the mask to invalidate',
    example: 1,
    type: 'integer',
  })
  @ApiResponse({ status: 204, description: 'Mask invalidated successfully' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Not the mask owner' })
  @ApiResponse({ status: 404, description: 'Mask not found' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatusCode.NO_CONTENT)
  @Roles([Role.ADMIN, Role.USER])
  async update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.MaskService.update(id, user);
  }

  @Get('masks/:id/stats')
  @ApiOperation({
    summary: 'Get mask statistics',
    description:
      'Retrieves detailed statistics for a specific mask including redirect count and other analytics.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the mask',
    example: 1,
    type: 'integer',
  })
  @ApiOkResponse({
    description: 'Mask statistics retrieved successfully',
    type: MaskStatsResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Not the mask owner' })
  @ApiResponse({ status: 404, description: 'Mask not found' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatusCode.OK)
  @Roles([Role.ADMIN, Role.USER])
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ): Promise<MaskStatsResponseDto> {
    return MaskStatsResponseDto.build(
      await this.MaskService.findOneByIdAndUserId(id, user.id),
    );
  }

  @Get('l/:code')
  @ApiOperation({
    summary: 'Redirect to original URL',
    description:
      'Redirects to the original URL associated with the mask code. Increments redirect counter. Requires password if mask is protected.',
  })
  @ApiParam({
    name: 'code',
    description: 'Unique mask code for redirection',
    example: 'abc123',
  })
  @ApiQuery({
    name: 'password',
    required: false,
    description: 'Password for protected masks',
    example: 'mySecretPassword123',
  })
  @ApiResponse({
    status: 302,
    description: 'Successfully redirected to original URL',
  })
  @ApiResponse({ status: 400, description: 'Invalid or expired mask' })
  @ApiResponse({
    status: 401,
    description: 'Password required or incorrect password',
  })
  @ApiResponse({ status: 404, description: 'Mask code not found' })
  @HttpCode(HttpStatusCode.OK)
  @Roles([Role.ADMIN, Role.USER])
  async redirect(
    @Param('code') code: string,
    @Query('password') password: string,
    @Res() response: Response,
  ) {
    const originUrl: string = await this.MaskService.findOneOriginUrl(
      code,
      password,
    );
    return response.redirect(originUrl);
  }
}
