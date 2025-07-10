export interface IMaskRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findOneByIdAndUserId(id: number, userId: number): Promise<T | null>;
}
