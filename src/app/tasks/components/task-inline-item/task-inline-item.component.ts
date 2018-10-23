import {Component, ChangeDetectionStrategy, Input, EventEmitter, Output} from '@angular/core';

import {Task} from '../../models/task.model';

@Component({
  selector: 'app-task-inline-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['task-inline-item.component.scss'],
  template: `
    <div class="flex__between task-inline">
      <div class="task-inline__id">TASK-{{task.id}}</div>
      <div class="task-inline__title">{{task.title}}</div>
      <div class="task-inline__status">{{task.status}}</div>
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
export class TaskInlineItemComponent {
  @Input() task: Task;
  @Output() removeClick = new EventEmitter<number>();

  handleDeleteClick(id: number) {
    this.removeClick.emit(id);
  }
}
