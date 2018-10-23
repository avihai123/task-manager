import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromStore from '../../store';

import {Task} from '../../models/task.model';

@Component({
  selector: 'app-task-node',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['task-node.component.scss'],
  template: `
    <div class="task-node" *ngIf="task$ | async as task">
      <div class="task-node__parent">
        <app-task-inline-item
        [task]="task"
        (removeClick)="onRemove($event)">
      </app-task-inline-item>
      </div>
      <ul>
        <li *ngFor="let subTaskId of task.subTaskIds; trackBy: trackByFn">
          <app-task-node
            [parentId]="task.id"
            [taskId]="subTaskId">
          </app-task-node>
        </li>
      </ul>
    </div>
  `,
})
export class TaskNodeComponent implements OnInit {
  @Input() taskId: number;
  @Input() parentId?: number;
  task$: Observable<Task>;

  constructor(private store: Store<fromStore.TasksState>) {
  }

  ngOnInit() {
    this.task$ = this.store.select(fromStore.getTaskById(this.taskId));
  }
  onRemove(event: Task) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromStore.RemoveTask(event.id));
    }
  }

  trackByFn(index, item) {
    return item.id;
  }
}
