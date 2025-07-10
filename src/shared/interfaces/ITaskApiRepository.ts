export interface ITaskApiRepository<T> {
  findAndCreatePopulateTasks(): Promise<T[]>;
}
