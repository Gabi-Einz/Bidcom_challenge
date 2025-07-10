import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskApiRepository } from './repositories/task-api.repository';
import { TaskListener } from './event/task.listener';
import { RedisService } from 'src/shared/redis/redis.service';
import { TypeOrmTaskRepository } from './repositories/typeorm-task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [
    TaskService,
    {
      provide: 'ITaskRepository',
      useClass: TypeOrmTaskRepository,
    },
    {
      provide: 'ITaskApiRepository',
      useClass: TaskApiRepository,
    },
    TaskListener,
    RedisService,
  ],
})
export class TaskModule {}
