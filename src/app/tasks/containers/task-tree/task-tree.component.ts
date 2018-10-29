import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromStore from '../../store';

@Component({
  selector: 'app-task-tree',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['task-tree.component.scss'],
  templateUrl: 'task-tree.component.html',
})
export class TaskTreeComponent implements OnInit {
  taskRootIds$: Observable<number[]>;

  constructor(private store: Store<fromStore.TasksState>) {
  }

  ngOnInit() {
    this.taskRootIds$ = this.store.select(fromStore.getRootTaskIds);
  }
}
