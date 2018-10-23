import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import * as fromStore from '../store';

import { Task } from '../models/task.model';
import {checkStoreLoaded} from './helpers';

@Injectable()
export class TaskExistsGuards implements CanActivate {
  constructor(private store: Store<fromStore.TasksState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return checkStoreLoaded(this.store).pipe(
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
}
