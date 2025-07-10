import { Injectable } from '@nestjs/common';
import { PopulateTaskResponse } from '../models/populate-task.response';
import { ITaskApiRepository } from 'src/shared/interfaces/ITaskApiRepository';

@Injectable()
export class TaskApiRepository
  implements ITaskApiRepository<PopulateTaskResponse>
{
  constructor() {}

  async findAndCreatePopulateTasks(): Promise<PopulateTaskResponse[]> {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const params = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      console.info('external http request', params.method, url);
      const fetchRes = await fetch(url, params);
      const data: PopulateTaskResponse[] =
        (await fetchRes.json()) as PopulateTaskResponse[];
      console.info('external http response', 'ok');
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching tasks');
    }
  }
}
