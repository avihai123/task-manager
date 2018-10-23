import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {reducers, effects} from './store';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromGuards from './guards';
import * as fromServices from './services';
import {
  MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatTooltipModule,
} from '@angular/material';

// routes
export const ROUTES: Routes = [
  {
    path: 'tasks',
    canActivate: [fromGuards.TasksGuard],
    component: fromContainers.TaskTreeComponent
  },
  {
    path: 'tasks/new',
    canActivate: [fromGuards.TasksGuard],
    component: fromContainers.TaskDetailsComponent,
  },
  {
    path: 'tasks/:taskId',
    canActivate: [fromGuards.TaskExistsGuards],
    component: fromContainers.TaskDetailsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('tasks', reducers),
    EffectsModule.forFeature(effects),
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components],
})
export class TasksModule {
}
