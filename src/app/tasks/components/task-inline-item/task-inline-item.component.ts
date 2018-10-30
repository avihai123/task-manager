import {Component, ChangeDetectionStrategy, Input, EventEmitter, Output, OnInit} from '@angular/core';

import {Task} from '../../models/task.model';
import {TaskStatuses} from '../../constants';
import {TaskStatus} from '../../models/task-status.model';

@Component({
  selector: 'app-task-inline-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['task-inline-item.component.scss'],
  templateUrl: 'task-inline-item.component.html',
})
export class TaskInlineItemComponent implements OnInit {
  private readonly taskStatuses = TaskStatuses;
  selectedStatus: TaskStatus;
  @Input() task: Task;
  @Output() removeClick = new EventEmitter<number>();

  ngOnInit() {
    this.selectedStatus = this.taskStatuses.get(this.task.statusId);
  }
  handleDeleteClick(id: number) {
    this.removeClick.emit(id);
  }
}
