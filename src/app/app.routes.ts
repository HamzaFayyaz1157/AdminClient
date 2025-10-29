import { Routes } from '@angular/router';
import { MainComponent } from './LayOut/main/main.component';
import { PettyCashComponent } from './LayOut/PettyCash/petty-cash/petty-cash.component';
import { CompanyComponent } from './LayOut/Setup/company/company.component';
import { LocationComponent } from './LayOut/Setup/location/location.component';

export const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'petty-cash', component: PettyCashComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'location', component: LocationComponent },
  { path: '**', redirectTo: '' }
];
