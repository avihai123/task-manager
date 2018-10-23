import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class TasksGuard implements CanActivate {
  constructor(private store: Store<fromStore.TasksState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  // TODO: Duplicate.
  checkStore(): Observable<boolean> {
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
