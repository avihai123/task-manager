import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromStore from '../../store';

@Component({
  selector: 'app-task-tree',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['task-tree.component.scss'],
  template: `
    <div class="task-tree">
      <div class="task__header flex__between">
        <h2>Task Manager</h2>
        <button
          mat-icon-button
          [routerLink]="['/tasks/new']"
          [queryParams]="{parentId: (task$ | async)?.id}"
          matTooltip="Add new sub task">
          <mat-icon>add</mat-icon>
        </button>
      </div>
      <ul>
        <li *ngFor="let taskId of taskRootIds$ | async">
          <app-task-node
            [taskId]="taskId">
          </app-task-node>
        </li>
      </ul>
    </div>
  `,
})
export class TaskTreeComponent implements OnInit {
  taskRootIds$: Observable<number[]>;

  constructor(private store: Store<fromStore.TasksState>) {
  }

  ngOnInit() {
    this.taskRootIds$ = this.store.select(fromStore.getRootTaskIds);
  }
}
