import {TaskStatus} from './models/task-status.model';

export const TaskStatusNotStarted: TaskStatus = {
  id: 1,
  icon: 'check_box_outline_blank',
  name: 'Not started',
  cls: 'success'
};

export const TaskStatusStarted: TaskStatus = {
  id: 2,
  icon: 'indeterminate_check_box',
  name: 'Started',
  cls: 'success'
};
export const TaskStatusComplete: TaskStatus = {
  id: 3,
  icon: 'check_box',
  name: 'Completed',
  cls: 'success'
};

export const TaskStatuses = new Map<number, TaskStatus>(
  [
    [TaskStatusNotStarted.id, TaskStatusNotStarted],
    [TaskStatusStarted.id, TaskStatusStarted],
    [TaskStatusComplete.id, TaskStatusComplete],
  ]
);
