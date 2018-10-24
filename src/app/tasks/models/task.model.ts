import {TaskStatus} from './task-status.model';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  statusId: number;
  parentId?: number | null;
  subTaskIds: number[];
}
