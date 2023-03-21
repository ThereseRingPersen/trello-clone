import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CARDS_FEATURE_KEY, CardsState, cardsAdapter } from './cards.reducer';

// Lookup the 'Cards' feature state managed by NgRx
export const selectCardsState =
  createFeatureSelector<CardsState>(CARDS_FEATURE_KEY);

const { selectAll, selectEntities } = cardsAdapter.getSelectors();

export const selectCardsLoaded = createSelector(
  selectCardsState,
  (state: CardsState) => state.loaded
);

export const selectCardsError = createSelector(
  selectCardsState,
  (state: CardsState) => state.error
);

export const selectAllCards = createSelector(
  selectCardsState,
  (state: CardsState) => selectAll(state)
);

export const selectCardsEntities = createSelector(
  selectCardsState,
  (state: CardsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectCardsState,
  (state: CardsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectCardsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
