import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import {StoreModule, MetaReducer} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {reducers, effects, CustomSerializer} from './store';

// not used in production
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {storeFreeze} from 'ngrx-store-freeze';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

// bootstrap
import {AppComponent} from './containers/app/app.component';
import {TasksModule} from './tasks/tasks.module';
import {InMemoryDataService} from './in-memory-data.service';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

import {AppRoutingModule} from './app-routing.module';
import {ModalComponent} from './components/modal/modal.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TasksModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [{provide: RouterStateSerializer, useClass: CustomSerializer}],
  declarations: [AppComponent, ModalComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
