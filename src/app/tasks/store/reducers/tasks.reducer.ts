import * as fromTasks from '../actions/tasks.action';
import {Task} from '../../models/task.model';

export interface TaskState {
  entities: { [id: number]: Task };
  loaded: boolean;
  loading: boolean;
}

export const initialState: TaskState = {
  entities: {},
  loaded: false,
  loading: false,
};


const getAllDescendantIds = (state, nodeId) => (
  state[nodeId].subTaskIds.reduce((acc, subTaskId) => (
    [...acc, subTaskId, ...getAllDescendantIds(state, subTaskId)]
  ), [])
);

const deleteMany = (state, ids) => {
  state = {...state};
  ids.forEach(id => delete state[id]);
  return state;
};


const deleteChild = (parent: Task, childId: number) => {
  return {
    ...parent,
    subTaskIds: parent.subTaskIds.filter(id => id !== childId)
  };
};

function addChild(parent: Task, childId: number) {
  return {
    ...parent,
    subTaskIds: [...parent.subTaskIds, childId]
  };
}

function deleteChildFromParent(entities: any, taskId: number) {
  const parentId = entities[taskId].parentId;
  if (parentId) {
    const parentTask = entities[parentId];
    const updatedParentTask = deleteChild(parentTask, taskId);
    return {...entities, [updatedParentTask.id]: updatedParentTask};
  }
  return entities;
}

function addChildToParent(entities: { [p: number]: Task }, task: Task) {
  const parentId = task.parentId;
  if (parentId) {
    const parentUpdated = addChild(entities[parentId], task.id);
    return {...entities, [parentUpdated.id]: parentUpdated};
  }
  return entities;
}

export function reducer(state = initialState,
                        action: fromTasks.TasksAction): TaskState {
  switch (action.type) {
    case fromTasks.LOAD_TASKS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromTasks.LOAD_TASKS_SUCCESS: {
      const tasks = action.payload;

      const entities = tasks.reduce(
        (entities: { [id: number]: Task }, task: Task) => {
          return {
            ...entities,
            [task.id]: task,
          };
        },
        {
          ...state.entities,
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }

    case fromTasks.LOAD_TASKS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromTasks.UPDATE_TASK_SUCCESS: {
      const task = action.payload;
      const entities = {
        ...state.entities,
        [task.id]: task,
      };

      return {
        ...state,
        entities,
      };
    }

    case fromTasks.CREATE_TASK_SUCCESS: {
      const task = {...action.payload, subTaskIds: []};
      let entities = {
        ...state.entities,
        [task.id]: task,
      };

      entities = addChildToParent(entities, task);

      return {
        ...state,
        entities,
      };
    }

    case fromTasks.REMOVE_TASK_SUCCESS: {
      const taskId = action.payload;
      const descendantIds = getAllDescendantIds(state.entities, taskId);
      let entities = deleteChildFromParent(state.entities, taskId);
      entities = deleteMany(entities, [taskId, ...descendantIds]);

      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getTasksEntities = (state: TaskState) => state.entities;
export const getTasksLoading = (state: TaskState) => state.loading;
export const getTasksLoaded = (state: TaskState) => state.loaded;
