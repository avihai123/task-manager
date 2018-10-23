import { TasksGuard } from './tasks.guard';
import { TaskExistsGuards } from './task-exists.guard';

export const guards: any[] = [TasksGuard, TaskExistsGuards];

export * from './tasks.guard';
export * from './task-exists.guard';
