import { Component, Inject } from '@angular/core';
import { Source } from '@state-adapt/core';
import { Adapt } from '@state-adapt/ngrx';
import { ADAPT_SERVICE } from './adapt.token';
import { countAdapter } from './count.adapter';

@Component({
  selector: 'state-adapt-increment',
  template: `
    <div style="width: 500px; margin: auto">
      <button (click)="increment$.next(3)">Increment by 3</button>
      <button (click)="decrement$.next()">Decrement</button>
      <button (click)="reset$.next()">Reset</button>
      <h1>{{ count$ | async }}</h1>
    </div>
  `,
})
export class IncrementComponent {
  increment$ = new Source<number>('increment$');
  decrement$ = new Source<void>('decrement$');
  reset$ = new Source<void>('reset$');
  store = this.adapt.init(['count', countAdapter, 0], {
    increment: this.increment$,
    decrement: this.decrement$,
    reset: this.reset$,
  });
  count$ = this.store.getState();
  constructor(@Inject(ADAPT_SERVICE) private adapt: Adapt) {}
}
