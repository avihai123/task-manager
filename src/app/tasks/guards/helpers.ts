 // TODO: Duplicate.
  import * as fromStore from '../store';
 import {Observable} from 'rxjs';
 import {filter, take, tap} from 'rxjs/operators';
 import {Store} from '@ngrx/store';

export function checkStoreLoaded(store: Store<fromStore.TasksState>): Observable<boolean> {
    return store.select(fromStore.getTasksLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          store.dispatch(new fromStore.LoadTasks());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
