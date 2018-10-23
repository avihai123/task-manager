import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Task} from './tasks/models/task.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      {
        id: 1,
        parentId: null,
        title: 'Blazin Inferno',
        description: 'Bla bla',
        status: 'Completed',
        subTaskIds: [2],
      },
      {
        id: 2,
        parentId: 1,
        title: 'Blazin Inferno',
        description: 'Bla bla',
        status: 'Completed',
        subTaskIds: [3, 4],
      },
      {
        id: 3,
        parentId: 2,
        title: 'Blaz',
        description: 'Bla bla',
        status: 'Completed',
        subTaskIds: [],
      },
      {
        id: 4,
        parentId: 2,
        title: 'HOLA',
        description: 'Bla bla',
        status: 'Completed',
        subTaskIds: [],
      },
    ];
    return {tasks};
  }
  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  }
}
