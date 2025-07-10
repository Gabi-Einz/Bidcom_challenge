import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ITaskRepository } from 'src/shared/interfaces/ITaskRepository';
import { Task } from './models/Task';
import { TaskCreationRequest } from './models/task-creation.request';
import { Role } from 'src/auth/authorization/enums/role.enum';
import { PopulateTaskResponse } from './models/populate-task.response';
import { ITaskApiRepository } from 'src/shared/interfaces/ITaskApiRepository';
import { MessageResponse } from './models/message.response';
import { TASK_COMPLETED, TASK_CREATED } from './event/task.event';
import { TaskEntity } from './models/task.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RedisService } from 'src/shared/redis/redis.service';
import { User } from 'src/user/models/User';
@Injectable()
export class TaskService {
  constructor(
    @Inject('ITaskRepository') private iTaskRepository: ITaskRepository<Task>,
    @Inject('ITaskApiRepository')
    private iTaskApiRepository: ITaskApiRepository<PopulateTaskResponse>,
    private eventEmitter: EventEmitter2,
    private readonly redisService: RedisService,
  ) {}

  async findAndCreatePopulateTasks(): Promise<MessageResponse> {
    const tasks: PopulateTaskResponse[] =
      await this.iTaskApiRepository.findAndCreatePopulateTasks();

    const seen = new Set();
    const uniqueTasks = tasks.filter((item) => {
      const key: string = `${item.userId}-${item.title}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
    const tasksToCreate = uniqueTasks.map((uniqueTask) => {
      const { id, ...rest } = uniqueTask;
      return { ...rest, priority: 'medium' };
    });
    await this.iTaskRepository.createMany(tasksToCreate);
    return new MessageResponse('tasks were created');
  }

  async findAllByUser(userId: number): Promise<Task[]> {
    const cachedTasks = await this.redisService.get(String(userId));
    if (cachedTasks) {
      console.info('Returning cached tasks data');
      return JSON.parse(cachedTasks) as Task[];
    }
    const tasks: Task[] = await this.iTaskRepository.findAllByUserId(userId);
    await this.redisService.set(String(userId), JSON.stringify(tasks), 10);
    console.log('Caching tasks by userId');
    return tasks;
  }

  async findOneByIdAndUserId(taskId: number, userId: number) {
    const task = await this.iTaskRepository.findOneByIdAndUserId(
      taskId,
      userId,
    );
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async create(createTaskDto: TaskCreationRequest, userId: number) {
    const data: TaskEntity = {
      ...createTaskDto,
      userId,
    };
    const task = await this.iTaskRepository.create(data);
    this.eventEmitter.emit(TASK_CREATED, task);
    return task;
  }

  async update(taskId: number, dto: TaskCreationRequest, userId: number) {
    const task = await this.findOneByIdAndUserId(taskId, userId);
    Object.assign(task, dto);
    task.updatedAt = new Date();
    if (task.completed) {
      this.eventEmitter.emit(TASK_COMPLETED, task);
    }
    return await this.iTaskRepository.updateById(taskId, task);
  }

  async remove(id: number, user: User) {
    const task = await this.iTaskRepository.findOneById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.userId !== user.id && user.role !== String(Role.ADMIN)) {
      throw new ForbiddenException('Not allowed to delete this task');
    }
    return this.iTaskRepository.deleteById(id);
  }
}
