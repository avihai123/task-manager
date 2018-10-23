import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromTasks from './tasks.reducer';

export interface TasksState {
  tasks: fromTasks.TaskState;
}

export const reducers: ActionReducerMap<TasksState> = {
  tasks: fromTasks.reducer,
};

export const getTasksState = createFeatureSelector<TasksState>(
  'tasks'
);
