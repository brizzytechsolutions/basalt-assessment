import { createAction, props } from '@ngrx/store';
import { Quote } from 'src/app/types/quote';

export const loadQuote = createAction('[Quote List] Load Quote');
export const loadQuoteSuccess = createAction('[Quote List] Load Quote Success', props<{quote: Quote[]}>());
export const loadQuoteFailure = createAction('[Quote List] Load Quote Failure', props<{error: any}>());

export const createQuote = createAction('[Quote] Create Quote', props<{quote: Quote}>());
export const createQuoteSuccess = createAction('[Quote] Create Quote Success', props<{quote: Quote}>());
export const createQuoteFailure = createAction('[Quote] Create Quote Failure', props<{error: any}>());