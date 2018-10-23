import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Task} from './tasks/models/task.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      {
        id: 1,
        parentId: null,
        title: 'Build task manager',
        description: 'build task manager',
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
