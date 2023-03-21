import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as CardsActions from './cards.actions';
import { CardsEffects } from './cards.effects';

describe('CardsEffects', () => {
  let actions: Observable<Action>;
  let effects: CardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CardsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CardsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CardsActions.initCards() });

      const expected = hot('-a-|', {
        a: CardsActions.loadCardsSuccess({ cards: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
