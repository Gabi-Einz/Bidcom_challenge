import { Inject, Injectable } from '@nestjs/common';
import { User } from './models/User';
import { IUserRepository } from 'src/shared/interfaces/IUserRepository';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository') private iUserRepository: IUserRepository<User>,
  ) {}

  async findOneByName(username: string): Promise<User | null> {
    return await this.iUserRepository.findByName(username);
  }
  async findOneById(userId: number): Promise<User | null> {
    return await this.iUserRepository.findById(userId);
  }

  async create(user: Partial<User>): Promise<void> {
    await this.iUserRepository.create(user);
  }
}
