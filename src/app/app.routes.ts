import { Routes } from '@angular/router';
import { MainComponent } from './LayOut/main/main.component';

import { CompanyComponent } from './LayOut/Setup/company/company.component';
import { LocationComponent } from './LayOut/Setup/location/location.component';
export const routes: Routes = [
    //{ path: '', component: MainComponent },
     //{ path: '', component: CompanyComponent },

     { path: '', component: LocationComponent }
];
