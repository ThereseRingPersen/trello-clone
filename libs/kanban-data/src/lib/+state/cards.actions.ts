import { createAction, props } from '@ngrx/store';
import { CardsEntity } from './cards.models';

export const initCards = createAction('[Cards Page] Init');

export const loadCardsSuccess = createAction(
  '[Cards/API] Load Cards Success',
  props<{ cards: CardsEntity[] }>()
);

export const loadCardsFailure = createAction(
  '[Cards/API] Load Cards Failure',
  props<{ error: any }>()
);
