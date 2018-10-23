import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromStore from '../../store';

import {Task} from '../../models/task.model';
import {tap} from 'rxjs/internal/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['task-details.component.scss'],
  template: `
    <div class="task-details">
      <app-task-form
        [task]="task$ | async"
        [exists]="exists"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)"
      >
      </app-task-form>
      <div class="sub-tasks" *ngIf="exists">
        <div class="sub-tasks__header flex__between">
          <h2>Sub Tasks</h2>
          <button
            mat-icon-button
            [routerLink]="['/tasks/new']"
            [queryParams]="{parentId: (task$ | async).id}"
            matTooltip="Add new sub task">
            <mat-icon>add</mat-icon>
          </button>
        </div>
        <div *ngFor="let subTask of subTasks$ | async">
          <app-task-inline-item
            [task]="subTask"
            (removeClick)="onRemove($event)">
          </app-task-inline-item>
        </div>
      </div>
    </div>
  `,
})
export class TaskDetailsComponent implements OnInit {
  exists = false;
  task$: Observable<Task>;
  subTasks$: Observable<Task[]>;

  constructor(private store: Store<fromStore.TasksState>,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.task$ = this.store.select(fromStore.getSelectedTask).pipe(
      tap(task => {
        this.exists = !!task;
      }
    ));
    this.subTasks$ = this.store.select(fromStore.getSelectedSubTasks);
  }

  onCreate(event: Task) {
    // TODO: get parentId from routerStoreState.
    event.parentId = +this.route.snapshot.queryParamMap.get('parentId') || null;
    this.store.dispatch(new fromStore.CreateTask(event));
  }

  onUpdate(event: Task) {
    this.store.dispatch(new fromStore.UpdateTask(event));
  }

  onRemove(event: Task) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromStore.RemoveTask(event.id));
    }
  }
}
