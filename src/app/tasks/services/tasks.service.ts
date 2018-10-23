import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {catchError} from 'rxjs/operators';

import {Task} from '../models/task.model';
import {Observable, throwError} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class TasksService {
  private readonly taskUrl = `/api/tasks`;

  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.taskUrl)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  createTask(payload: Task): Observable<Task> {
    return this.http
      .post<Task>(this.taskUrl, payload, httpOptions)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  updateTask(payload: Task): Observable<Task> {
    return this.http
      .put<Task>(`${this.taskUrl}/${payload.id}`, payload, httpOptions)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  removeTask(payload: number): Observable<number> {
    return this.http
      .delete<any>(`${this.taskUrl}/${payload}`, httpOptions)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
