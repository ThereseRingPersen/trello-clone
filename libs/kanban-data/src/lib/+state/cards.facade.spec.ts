import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as CardsActions from './cards.actions';
import { CardsEffects } from './cards.effects';
import { CardsFacade } from './cards.facade';
import { CardsEntity } from './cards.models';
import {
  CARDS_FEATURE_KEY,
  CardsState,
  initialCardsState,
  cardsReducer,
} from './cards.reducer';
import * as CardsSelectors from './cards.selectors';

interface TestSchema {
  cards: CardsState;
}

describe('CardsFacade', () => {
  let facade: CardsFacade;
  let store: Store<TestSchema>;
  const createCardsEntity = (id: string, name = ''): CardsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CARDS_FEATURE_KEY, cardsReducer),
          EffectsModule.forFeature([CardsEffects]),
        ],
        providers: [CardsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(CardsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allCards$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allCards$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadCardsSuccess` to manually update list
     */
    it('allCards$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allCards$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        CardsActions.loadCardsSuccess({
          cards: [createCardsEntity('AAA'), createCardsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allCards$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
