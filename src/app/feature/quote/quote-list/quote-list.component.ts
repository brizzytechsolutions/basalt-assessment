import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, startWith, takeUntil } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectQuote } from 'src/app/store/selector/quote.selector';
import { Quote } from 'src/app/types/quote';
import * as QuoteActions from '../../../store/actions/quote.actions';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss']
})
export class QuoteListComponent implements OnInit {
  quotes$!: Observable<Quote[]>;
  dataSource!: MatTableDataSource<Quote>;
  private destroy$ = new Subject<void>();
  displayedColumns: string[] = ['quote', 'author', 'category'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    ) {
    this.quotes$ = this.store.select(selectQuote);
  }

  ngOnInit() {
    this.getQuotes();
    this.quotes$.pipe(takeUntil(this.destroy$)).subscribe(quotes => {
      this.dataSource = new MatTableDataSource(quotes);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  

  getQuotes() {
    this.store.dispatch(QuoteActions.loadQuote()); 
  }

  navigateToAddQuote() {
    this.router.navigate(['add']);
  }  

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
