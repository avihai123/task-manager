import {Injectable} from '@angular/core';

import {Effect, Actions, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, switchMap, catchError} from 'rxjs/operators';

import * as fromRoot from '../../../store';
import * as taskActions from '../actions/tasks.action';
import * as fromServices from '../../services';

@Injectable()
export class TasksEffects {
  constructor(private actions$: Actions,
              private taskService: fromServices.TasksService) {
  }

  @Effect()
  loadTasks$ = this.actions$.pipe(
    ofType(taskActions.LOAD_TASKS),
    switchMap(() => {
      return this.taskService
        .getTasks()
        .pipe(
          map(tasks => new taskActions.LoadTasksSuccess(tasks)),
          catchError(error => of(new taskActions.LoadTasksFail(error)))
        );
    })
  );

  @Effect()
  createTask$ = this.actions$.ofType(taskActions.CREATE_TASK).pipe(
    map((action: taskActions.CreateTask) => action.payload),
    switchMap(task => {
      return this.taskService
        .createTask(task)
        .pipe(
          map(task => new taskActions.CreateTaskSuccess(task)),
          catchError(error => of(new taskActions.CreateTaskFail(error)))
        );
    })
  );

  @Effect()
  createTaskSuccess$ = this.actions$
    .ofType(taskActions.CREATE_TASK_SUCCESS)
    .pipe(
      map((action: taskActions.CreateTaskSuccess) => action.payload),
      map(task => {
        const path = ['/tasks'];
        if (task.parentId) {
          path.push(task.parentId.toString());
        }
        return new fromRoot.Back();
      })
    );

  @Effect()
  updateTask$ = this.actions$.ofType(taskActions.UPDATE_TASK).pipe(
    map((action: taskActions.UpdateTask) => action.payload),
    switchMap(task => {
      return this.taskService
        .updateTask(task)
        .pipe(
          map(() => new taskActions.UpdateTaskSuccess(task)),
          catchError(error => of(new taskActions.UpdateTaskFail(error)))
        );
    })
  );

  @Effect()
  removeTask$ = this.actions$.ofType(taskActions.REMOVE_TASK).pipe(
    map((action: taskActions.RemoveTask) => action.payload),
    switchMap(taskId => {
      return this.taskService
        .removeTask(taskId)
        .pipe(
          map(() => new taskActions.RemoveTaskSuccess(taskId)),
          catchError(error => of(new taskActions.RemoveTaskFail(error)))
        );
    })
  );
}
