import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteListComponent } from './feature/quote/quote-list/quote-list.component';
import { AddQuoteComponent } from './feature/quote/add-quote/add-quote.component';

const routes: Routes = [
  { path: '', redirectTo: 'quote', pathMatch: 'full' },
  {
    path: 'quote',
    loadChildren: () =>
      import('./feature/quote/quote.module').then((m) => m.QuoteModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
