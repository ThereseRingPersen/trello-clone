import { Action } from '@ngrx/store';

import * as CardsActions from './cards.actions';
import { CardsEntity } from './cards.models';
import { CardsState, initialCardsState, cardsReducer } from './cards.reducer';

describe('Cards Reducer', () => {
  const createCardsEntity = (id: string, name = ''): CardsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Cards actions', () => {
    it('loadCardsSuccess should return the list of known Cards', () => {
      const cards = [
        createCardsEntity('PRODUCT-AAA'),
        createCardsEntity('PRODUCT-zzz'),
      ];
      const action = CardsActions.loadCardsSuccess({ cards });

      const result: CardsState = cardsReducer(initialCardsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = cardsReducer(initialCardsState, action);

      expect(result).toBe(initialCardsState);
    });
  });
});
