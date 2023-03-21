import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as CardsActions from './cards.actions';
import * as CardsFeature from './cards.reducer';

import { switchMap, catchError, of } from 'rxjs';

@Injectable()
export class CardsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardsActions.initCards),
      switchMap(() => of(CardsActions.loadCardsSuccess({ cards: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(CardsActions.loadCardsFailure({ error }));
      })
    )
  );
}
