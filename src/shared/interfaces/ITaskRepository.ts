export interface ITaskRepository<T> {
  create(data: Partial<T>): Promise<T>;
  createMany(data: Partial<T>[]): Promise<void>;
  updateById(id: number, data: Partial<T>): Promise<void>;
  deleteById(id: number): Promise<void>;
  findOneByIdAndUserId(id: number, userId: number): Promise<T | null>;
  findOneById(id: number): Promise<T | null>;
  findAllByUserId(userId: number): Promise<T[]>;
}
