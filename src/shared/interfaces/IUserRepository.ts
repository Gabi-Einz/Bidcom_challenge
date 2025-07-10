export interface IUserRepository<T> {
  create(data: Partial<T>): Promise<void>;
  updateById(id: number, data: Partial<T>): Promise<void>;
  deleteById(id: number): Promise<void>;
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  findByName(name: string): Promise<T | null>;
}
