import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
  <div class="app">
    <div class="app__header">
    </div>
    <div class="app__content">
      <div class="app__container">
        <router-outlet></router-outlet>
      </div>
      <div class="app__footer">
      </div>
    </div>
  </div>
  `,
})
export class AppComponent {}
