// import { Injectable } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
// import { ITaskRepository } from '../../shared/interfaces/ITaskRepository';
// import { TaskEntity } from '../models/task.entity';

// @Injectable()
// export class TaskRepository implements ITaskRepository<TaskEntity> {
//   private prisma: PrismaClient;

//   constructor() {
//     this.prisma = new PrismaClient();
//   }

//   async create(data: Omit<TaskEntity, 'id'>): Promise<TaskEntity> {
//     return this.prisma.task.create({
//       data,
//     });
//   }

//   async createMany(data: Omit<TaskEntity, 'id'>[]): Promise<void> {
//     await this.prisma.task.createMany({
//       data,
//       skipDuplicates: true,
//     });
//   }

//   async findAllByUserId(userId: number): Promise<TaskEntity[]> {
//     return this.prisma.task.findMany({
//       where: { userId },
//     });
//   }

//   async findOneByIdAndUserId(id: number, userId: number): Promise<TaskEntity | null> {
//     return this.prisma.task.findUnique({
//       where: { id, userId },
//     });
//   }

//   async findOneById(id: number): Promise<TaskEntity | null> {
//     return this.prisma.task.findUnique({
//       where: { id },
//     });
//   }

//   async updateById(id: number, data: Partial<Omit<TaskEntity, 'id'>>): Promise<TaskEntity> {
//     return this.prisma.task.update({
//       where: { id },
//       data,
//     });
//   }

//   async deleteById(id: number): Promise<void> {
//     await this.prisma.task.delete({
//       where: { id },
//     });
//   }
// }
