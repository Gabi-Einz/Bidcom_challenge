// import { Injectable } from '@nestjs/common';
// import { PrismaClient, User } from '@prisma/client';
// import { IUserRepository } from '../../shared/interfaces/IUserRepository';

// @Injectable()
// export class UserRepository implements IUserRepository<User> {
//   private prisma: PrismaClient;

//   constructor() {
//     this.prisma = new PrismaClient();
//   }

//   async create(data: Omit<User, 'id'>): Promise<User> {
//     return this.prisma.user.create({
//       data,
//     });
//   }

//   async findAll(): Promise<User[]> {
//     return this.prisma.user.findMany();
//   }

//   async findById(id: number): Promise<User | null> {
//     return this.prisma.user.findUnique({
//       where: { id },
//     });
//   }

//   async findByName(name: string): Promise<User | null> {
//     return this.prisma.user.findUnique({
//       where: { name },
//     });
//   }

//   async updateById(id: number, data: Partial<Omit<User, 'id'>>): Promise<User> {
//     return this.prisma.user.update({
//       where: { id },
//       data,
//     });
//   }

//   async deleteById(id: number): Promise<User> {
//     return this.prisma.user.delete({
//       where: { id },
//     });
//   }
// }
