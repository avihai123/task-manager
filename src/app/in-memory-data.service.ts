import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Task} from './tasks/models/task.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // const tasks = [
    //   {
    //     id: 1,
    //     parentId: null,
    //     title: 'Build task manager',
    //     description: 'build task manager',
    //     statusId: 1,
    //     subTaskIds: [],
    //   },
    // ];
    const tasks = generateTree();
    return {tasks};
  }
  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  }
}

function generateTree() {
  const n = 5;
  const tasks = [];
  for (let i = 1; i <= n; i++) {
    const subTaskIds = [];
    for (let j = 1; j <= 3; j++) {
      const task = {
        id: n + i + j,
        parentId: i,
        title: `Node ${n + i + j}`,
        statusId: 2,
        subTaskIds: [],
      };
      tasks.push(task);
      subTaskIds.push(task.id);
    }
    tasks.push({
      id: i,
      parentId: null,
      title: `Node ${i}`,
      statusId: 2,
      subTaskIds: subTaskIds,
    });
  }
  return tasks;
}
