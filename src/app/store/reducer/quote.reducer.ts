import { createReducer, on } from '@ngrx/store';
import { Quote } from 'src/app/types/quote';
import {
    createQuote,
  createQuoteFailure,
  createQuoteSuccess,
  loadQuote,
  loadQuoteFailure,
  loadQuoteSuccess,
} from '../actions/quote.actions';

export interface QuoteState {
  quote: Quote[];
  loading: boolean;
  error: Error | null;
}

export const initialState: QuoteState = {
  quote: [],
  loading: false,
  error: null,
};

export const quoteReducer = createReducer(
  initialState,
  on(loadQuote, (state) => ({ ...state })),
  on(loadQuoteSuccess, (state, { quote }) => ({ ...state, quote })),
  on(loadQuoteFailure, (state, { error }) => ({ ...state, error })),

  on(createQuote, (state) => ({ ...state, loading: true })),
  on(createQuoteSuccess, (state, { quote }) => ({ ...state, quote: [...state.quote, quote], loading: false, error: null })),
  on(createQuoteFailure, (state, { error }) => ({ ...state, loading: false, error, }))
);
