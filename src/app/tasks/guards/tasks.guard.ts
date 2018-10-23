import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {switchMap, catchError} from 'rxjs/operators';

import * as fromStore from '../store';
import {checkStoreLoaded} from './helpers';

@Injectable()
export class TasksGuard implements CanActivate {
  constructor(private store: Store<fromStore.TasksState>) {
  }

  canActivate(): Observable<boolean> {
    return checkStoreLoaded(this.store).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
