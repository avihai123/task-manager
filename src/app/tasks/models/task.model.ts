export enum TaskStatus {
  NOT_STARTED = 'Not started',
  STARTED = 'Started',
  COMPLETE = 'Complete',
}


export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  parentId?: number | null;
  subTaskIds: number[];
}
