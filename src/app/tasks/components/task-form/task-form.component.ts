import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import {Task, TaskStatus} from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['task-form.component.scss'],
  template: `
    <div>
      <h2 *ngIf="exists">Edit Task</h2>
      <h2 *ngIf="!exists">Create New Task</h2>
      <form [formGroup]="form">
          <mat-form-field>
            <input matInput
              type="text"
              formControlName="title"
              placeholder="Add a title..."
              class="task-form__input"
              [class.error]="titleControlInvalid">
            <mat-error *ngIf="titleControlInvalid">Task must have a title</mat-error>
          </mat-form-field>
        <mat-form-field>
          <mat-select
            placeholder="Status"
            formControlName="status"
            name="status">
            <mat-option *ngFor="let status of taskStatuses" value="{{status[1]}}">
              {{status[1]}}
            </mat-option>
          </mat-select>
        </mat-form-field>
          <mat-form-field>
            <textarea matInput
              type="text"
              formControlName="description"
              placeholder="Add a description..."
              class="task-form__input">
            </textarea>
          </mat-form-field>
        <div class="task-form__actions">
          <button mat-raised-button
            type="button"
            class="btn btn__ok"
            *ngIf="!exists"
            [disabled]="!form.valid || form.pristine"
            (click)="createTask(form)">
            Create task
          </button>
          <button mat-raised-button
            type="button"
            class="btn btn__ok"
            *ngIf="exists"
            [disabled]="!form.valid || form.pristine"
            (click)="updateTask(form)">
            Update task
          </button>
          <button mat-raised-button
            type="button"
            class="btn btn__warning"
            *ngIf="exists"
            (click)="removeTask(form)">
            Delete Task
          </button>
        </div>
      </form>
    </div>
  `,
})
export class TaskFormComponent implements OnChanges {
  readonly taskStatuses = Object.entries(TaskStatus);

  @Input() task: Task;
  @Input() exists: boolean;
  @Output() create = new EventEmitter<Task>();
  @Output() update = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();

  form = this.fb.group({
    title: ['', Validators.compose([Validators.required])],
    description: [''],
    status: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {
  }

  get titleControl() {
    return this.form.get('title') as FormControl;
  }

  get titleControlInvalid() {
    return this.titleControl.hasError('required') && this.titleControl.touched;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.task && this.task.id) {
      this.form.patchValue(this.task);
    } else {
      this.form.patchValue(({'status': TaskStatus.NOT_STARTED}));
    }
  }

  createTask(form: FormGroup) {
    const {value, valid} = form;
    if (valid) {
      this.create.emit(value);
      form.markAsPristine();
    }
  }

  updateTask(form: FormGroup) {
    const {value, valid, touched} = form;
    if (touched && valid) {
      this.update.emit({...this.task, ...value});
      form.markAsPristine();
    }
  }

  removeTask(form: FormGroup) {
    const {value} = form;
    this.remove.emit({...this.task, ...value});
  }
}
