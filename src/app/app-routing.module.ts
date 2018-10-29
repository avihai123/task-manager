import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// routes
const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'tasks'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
