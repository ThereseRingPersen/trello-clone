import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CardsActions from './cards.actions';
import { CardsEntity } from './cards.models';

export const CARDS_FEATURE_KEY = 'cards';

export interface CardsState extends EntityState<CardsEntity> {
  selectedId?: string | number; // which Cards record has been selected
  loaded: boolean; // has the Cards list been loaded
  error?: string | null; // last known error (if any)
}

export interface CardsPartialState {
  readonly [CARDS_FEATURE_KEY]: CardsState;
}

export const cardsAdapter: EntityAdapter<CardsEntity> =
  createEntityAdapter<CardsEntity>();

export const initialCardsState: CardsState = cardsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialCardsState,
  on(CardsActions.initCards, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CardsActions.loadCardsSuccess, (state, { cards }) =>
    cardsAdapter.setAll(cards, { ...state, loaded: true })
  ),
  on(CardsActions.loadCardsFailure, (state, { error }) => ({ ...state, error }))
);

export function cardsReducer(state: CardsState | undefined, action: Action) {
  return reducer(state, action);
}
