import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as CardsActions from './cards.actions';
import * as CardsFeature from './cards.reducer';
import * as CardsSelectors from './cards.selectors';

@Injectable()
export class CardsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(CardsSelectors.selectCardsLoaded));
  allCards$ = this.store.pipe(select(CardsSelectors.selectAllCards));
  selectedCards$ = this.store.pipe(select(CardsSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(CardsActions.initCards());
  }
}
