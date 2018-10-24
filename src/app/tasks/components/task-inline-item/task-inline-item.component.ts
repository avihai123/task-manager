import {Component, ChangeDetectionStrategy, Input, EventEmitter, Output, OnInit} from '@angular/core';

import {Task} from '../../models/task.model';
import {TaskStatuses} from '../../constants';
import {TaskStatus} from '../../models/task-status.model';

@Component({
  selector: 'app-task-inline-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['task-inline-item.component.scss'],
  template: `
    <div class="flex__between task-inline">
      <div class="task-inline__id">TASK-{{task.id}}</div>
      <div class="task-inline__title">{{task.title}}</div>
      <div class="task-inline__status">
        <mat-icon matTooltip="{{selectedStatus.name}}">
                {{selectedStatus.icon}}
        </mat-icon>
      </div>
      <div class="task-inline__actions">
        <button mat-icon-button
                matTooltip="Edit task"
                [routerLink]="['/tasks', task.id]">
          <mat-icon [inline]="true">create</mat-icon>
        </button>
        <button mat-icon-button
                matTooltip="Delete task"
                (click)="handleDeleteClick(task)">
          <mat-icon [inline]="true">clear</mat-icon>
        </button>
      </div>
    </div>
  `,
})
export class TaskInlineItemComponent implements OnInit{
  private readonly taskStatuses = TaskStatuses;
  selectedStatus: TaskStatus;
  @Input() task: Task;
  @Output() removeClick = new EventEmitter<number>();

  ngOnInit() {
    this.selectedStatus = this.taskStatuses.get(this.task.statusId);
  };
  handleDeleteClick(id: number) {
    this.removeClick.emit(id);
  }
}
