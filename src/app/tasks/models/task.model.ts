import {TaskStatus} from './task-status.model';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  parentId?: number | null;
  subTaskIds: number[];
}
