import { Component } from '@angular/core';
import { Source } from '@state-adapt/core';
import { Adapt } from '@state-adapt/ngxs';
import { countAdapter } from './count.adapter';

@Component({
  selector: 'state-adapt-root',
  template: `
    <state-adapt-counter
      (increment)="increment$.next($event)"
      (double)="double$.next()"
      (resetCount)="reset$.next()"
      [count]="store.state$ | async"
    ></state-adapt-counter>
  `,
})
export class AppComponent {
  increment$ = new Source<number>('increment$');
  double$ = new Source<void>('double$');
  reset$ = new Source<void>('reset$');

  store = this.adapt.init(['count', countAdapter, 0], {
    increment: this.increment$,
    double: this.double$,
    reset: this.reset$,
  });

  constructor(private adapt: Adapt) {}
}
