import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  actionSanitizer,
  stateSanitizer,
  adaptReducer,
  createStore,
} from '../../../../libs/core/src';
import { ADAPT_SERVICE, DemoUiModule } from '../../../../libs/demo-ui/src';
import { Adapt } from '../../../../libs/ngrx/src';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

const enableReduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__?.({
  actionSanitizer,
  stateSanitizer,
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // StoreModule.forRoot({ adapt: adaptReducer }),
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25,
    //   logOnly: environment.production,
    //   actionSanitizer,
    //   stateSanitizer,
    // }),
    DemoUiModule,
  ],
  providers: [
    // { provide: ADAPT_SERVICE, useClass: Adapt },
    { provide: ADAPT_SERVICE, useValue: createStore(enableReduxDevTools) },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
