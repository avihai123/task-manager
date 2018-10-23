import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';
import * as fromStore from '../store';

import { Task } from '../models/task.model';

@Injectable()
export class TaskExistsGuards implements CanActivate {
  constructor(private store: Store<fromStore.TasksState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.taskId, 10);
        return this.hasTask(id);
      })
    );
  }

  private hasTask(id: number): Observable<boolean> {
    return this.store
      .select(fromStore.getTasksEntities)
      .pipe(
        map((entities: { [key: number]: Task }) => !!entities[id]),
        take(1)
      );
  }

  private checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getTasksLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadTasks());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
