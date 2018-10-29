import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import * as fromContainers from './containers';
import * as fromGuards from './guards';

const tasksRoutes: Routes = [
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
    RouterModule.forChild(tasksRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TasksRoutingModule {
}
