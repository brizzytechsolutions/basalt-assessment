import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QuoteService } from 'src/app/services/quote.service';
import * as QuoteActions from '../actions/quote.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Quote } from 'src/app/types/quote';

@Injectable()
export class QuoteEffects {
  constructor(private actions$: Actions, private quoteService: QuoteService) {}

  loadQuote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuoteActions.loadQuote),
      mergeMap(() =>
        this.quoteService.getAllQuotes().pipe(
          map((quote) => QuoteActions.loadQuoteSuccess({ quote })),
          catchError((error) => of(QuoteActions.loadQuoteFailure({ error })))
        )
      )
    );
  });

  createQuote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuoteActions.createQuote),
      mergeMap((action) => this.quoteService.createQuote(action.quote).pipe(
        map((quote: Quote) => {
          console.log('Quote created:', quote); // Log the created quote
          return QuoteActions.createQuoteSuccess({ quote });
        }),
        catchError((error) => {
          console.error('Error creating quote:', error); // Log any errors
          return of(QuoteActions.createQuoteFailure({ error }));
        })
      ))
    );
  });
}
