import { Injectable } from '@angular/core';
import { Quote } from '../types/quote';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private apiUrl = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/';
  private apiKey = '15830244a0mshd9a90d4d162c80cp14cad6jsn0bb136052f75';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-rapidapi-key': this.apiKey,
      'x-rapidapi-host': 'andruxnet-random-famous-quotes.p.rapidapi.com'
    }),
  };

  constructor(private http: HttpClient) {}

  getAllQuotes(): Observable<Quote[]> {
    const urlParam = `${this.apiUrl}?cat=famous&count=20`;
    return this.http.get<Quote[]>(urlParam, this.httpOptions)
   .pipe(catchError(this.handleError));

  }

  createQuote(data: Quote): Observable<Quote> {
    // const urlParam = `${this.apiUrl}?cat=famous&count=20`;
    return this.http.post<Quote>(this.apiUrl, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // getQuoteById(quoteId: string): Observable<Quote> {
  //   const urlParam = `${this.apiUrl}?cat=famous&count=10`;
  //   return this.http.get<Quote>(urlParam, this.httpOptions)
  //     .pipe(catchError(this.handleError));
  // }

  private handleError(error: HttpErrorResponse) {
    const errorMessage =
      error.error instanceof ErrorEvent
        ? `Client/network error occurred: ${error.error.message}`
        : `Server returned code ${error.status}, error message is: ${error.message}`;
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
