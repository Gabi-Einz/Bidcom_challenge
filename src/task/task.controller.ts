import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './models/Task';
import { JwtAuthGuard } from 'src/auth/authentication/jwt/guards/jwt-auth.guard';
import { TaskCreationRequest } from './models/task-creation.request';
import { RolesGuard } from 'src/auth/authorization/guards/role.guard';
import { Roles } from 'src/auth/authorization/decorators/role.decorator';
import { Role } from 'src/auth/authorization/enums/role.enum';
import { HttpStatusCode } from 'src/shared/enums/http-status-code.enum';
import { MessageResponse } from './models/message.response';
import { SkipThrottle } from '@nestjs/throttler';
import { CurrentUser } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/user/models/User';

@SkipThrottle()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @HttpCode(HttpStatusCode.OK)
  @Roles([Role.ADMIN, Role.USER])
  async findAll(@CurrentUser() user: User): Promise<Task[]> {
    return await this.taskService.findAllByUser(user.id);
  }

  @Get('populate')
  @HttpCode(HttpStatusCode.OK)
  @Roles([Role.ADMIN, Role.USER])
  async findAndCreatePopulateTasks(): Promise<MessageResponse> {
    return await this.taskService.findAndCreatePopulateTasks();
  }

  @Post()
  @HttpCode(HttpStatusCode.CREATED)
  @Roles([Role.ADMIN, Role.USER])
  async create(
    @Body() taskCreationRequest: TaskCreationRequest,
    @CurrentUser() user: User,
  ) {
    return await this.taskService.create(taskCreationRequest, user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatusCode.OK)
  @Roles([Role.ADMIN, Role.USER])
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    return await this.taskService.findOneByIdAndUserId(id, user.id);
  }

  @Patch(':id')
  @HttpCode(HttpStatusCode.NO_CONTENT)
  @Roles([Role.ADMIN, Role.USER])
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TaskCreationRequest,
    @CurrentUser() user: User,
  ) {
    await this.taskService.update(id, dto, user.id);
    return {};
  }

  @Delete(':id')
  @HttpCode(HttpStatusCode.NO_CONTENT)
  @Roles([Role.ADMIN, Role.USER])
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    await this.taskService.remove(id, user);
    return {};
  }
}
