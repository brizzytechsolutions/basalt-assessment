import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { QuoteState } from '../reducer/quote.reducer';

export const selectQuoteState = (state: AppState) => state.quote;

export const selectQuote = createSelector(
  selectQuoteState,
  (state: QuoteState) => state.quote
);
