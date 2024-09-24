import { Routes } from '@angular/router';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { CompanyDetailsGuard } from './guards/company-details-guard.guard';
import { OfficersComponent } from './components/officers/officers.component';
import { CompanyDetailsResolver } from './resolvers/company-details-resolver';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

export const routes: Routes = [
  { path: '', component: SearchInputComponent },
  { path: 'results', component: SearchResultsComponent },
  {
    path: 'details/:id',
    component: CompanyDetailComponent,
    canActivate: [CompanyDetailsGuard],
  },
  {
    path: 'officers-list/:id',
    component: OfficersComponent,
    resolve: { companyDetails: CompanyDetailsResolver },
    canActivate: [CompanyDetailsGuard],
  },
];
