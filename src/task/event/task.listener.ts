import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TASK_CREATED, TASK_COMPLETED } from './task.event';
import { Task } from '../models/Task';

@Injectable()
export class TaskListener {
  @OnEvent(TASK_CREATED)
  handleTaskCreated(task: Task) {
    console.log(`Task created: ${task.id} ${task.title}`);
  }

  @OnEvent(TASK_COMPLETED)
  handleTaskCompleted(task: Task) {
    console.log(`Task completed: ${task.id} ${task.title}`);
  }
}
