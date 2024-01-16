import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';
import { MaterialModule } from 'src/app/angular-material/angular-material';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    QuoteListComponent,
    AddQuoteComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class QuoteModule { }
