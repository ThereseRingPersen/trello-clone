import { CardsEntity } from './cards.models';
import {
  cardsAdapter,
  CardsPartialState,
  initialCardsState,
} from './cards.reducer';
import * as CardsSelectors from './cards.selectors';

describe('Cards Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCardsId = (it: CardsEntity) => it.id;
  const createCardsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CardsEntity);

  let state: CardsPartialState;

  beforeEach(() => {
    state = {
      cards: cardsAdapter.setAll(
        [
          createCardsEntity('PRODUCT-AAA'),
          createCardsEntity('PRODUCT-BBB'),
          createCardsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialCardsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Cards Selectors', () => {
    it('selectAllCards() should return the list of Cards', () => {
      const results = CardsSelectors.selectAllCards(state);
      const selId = getCardsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = CardsSelectors.selectEntity(state) as CardsEntity;
      const selId = getCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectCardsLoaded() should return the current "loaded" status', () => {
      const result = CardsSelectors.selectCardsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectCardsError() should return the current "error" state', () => {
      const result = CardsSelectors.selectCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
