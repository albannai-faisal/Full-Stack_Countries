import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';
import { CountryListComponent } from './pages/country-list/country-list.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'Country', component: CountryListComponent },
      { path: 'Country/:cca3', component: CountryDetailComponent },
      { path: '', redirectTo: '/Country', pathMatch: 'full' },
      { path: '**', redirectTo: '/Country' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
