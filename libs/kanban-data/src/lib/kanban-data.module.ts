import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCards from './+state/cards.reducer';
import { CardsEffects } from './+state/cards.effects';
import { CardsFacade } from './+state/cards.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCards.CARDS_FEATURE_KEY, fromCards.cardsReducer),
    EffectsModule.forFeature([CardsEffects]),
  ],
  providers: [CardsFacade],
})
export class KanbanDataModule {}
