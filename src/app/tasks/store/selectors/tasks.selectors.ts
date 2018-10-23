import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromTasks from '../reducers/tasks.reducer';

import { Task } from '../../models/task.model';

export const getTaskState = createSelector(
  fromFeature.getTasksState,
  (state: fromFeature.TasksState) => state.tasks
);

export const getTasksEntities = createSelector(
  getTaskState,
  fromTasks.getTasksEntities
);

export const getSelectedTask = createSelector(
  getTasksEntities,
  fromRoot.getRouterState,
  (entities, router): Task => {
    return router.state && entities[router.state.params.taskId];
  }
);

export const getSelectedSubTasks = createSelector(
  getTasksEntities,
  getSelectedTask,
  (entities, task) => {
    if (task && task.subTaskIds && task.subTaskIds.length > 0) {
      return task.subTaskIds.map(id => entities[id]);
    }
    return null;
  }
);

export const getTaskById = (id: number) => createSelector(
  getTasksEntities,
  entities => entities[id]
);

export const getRootTaskIds = createSelector(
  getTasksEntities,
  entities => {
    return Object.values(entities)
      .filter(task => task.parentId === null)
      .map(task => task.id);
  }
);

export const getTasksLoaded = createSelector(
  getTaskState,
  fromTasks.getTasksLoaded
);

export const getTasksLoading = createSelector(
  getTaskState,
  fromTasks.getTasksLoading
);
