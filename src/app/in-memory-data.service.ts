import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Task} from './tasks/models/task.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = generateTree();
    return {tasks};
  }

  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  }
}

function generateTree() {
  const tree = {};
  for (let i = 1; i < 25; i++) {
    let parentId = Math.floor(Math.pow(Math.random(), 2) * i);

    if (parentId === 0) {
      parentId = null;
    } else {
      tree[parentId].subTaskIds.push(i);
    }
    tree[i] = {
      parentId: parentId,
      id: i,
      title: `Task ${i}`,
      statusId: 1,
      subTaskIds: []
    };
  }
  return Object.values(tree);
}
