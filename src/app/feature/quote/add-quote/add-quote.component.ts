import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createQuote } from 'src/app/store/actions/quote.actions';
import { AppState } from 'src/app/store/app.state';
import { Quote } from 'src/app/types/quote';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.scss'],
})
export class AddQuoteComponent implements OnInit {
  quoteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.quoteForm = this.fb.group({
      quote: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.quoteForm.valid) {
      const quotePayload: Quote = this.quoteForm.value;
      this.store.dispatch(createQuote({ quote: quotePayload }));

      this.snackBar.open('Quote submitted successfully', 'Close', {
        duration: 3000,
      });

      // Navigate to the list route after a delay
      setTimeout(() => {
        this.router.navigate(['/list']);
      }, 2000);
    } else {
      this.snackBar.open('Please fill in all fields', 'Close', {
        duration: 2000,
      });
    }
  }

  goBack() {
    this.router.navigate(['list']);
  }
}
