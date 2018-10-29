import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy, ViewChild, ElementRef,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import {Task} from '../../models/task.model';
import {TaskStatuses, TaskStatusNotStarted} from '../../constants';

@Component({
  selector: 'app-task-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['task-form.component.scss'],
  templateUrl: 'task-form.component.html',
})
export class TaskFormComponent implements OnChanges {
  readonly taskStatuses = Array.from(TaskStatuses.values());

  @Input() task: Task;
  @Input() exists: boolean;
  @Output() create = new EventEmitter<Task>();
  @Output() update = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();

  @ViewChild('title') titleField: ElementRef;

  form = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    statusId: [TaskStatusNotStarted.id, Validators.required],
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
      this.titleField.nativeElement.focus();
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
