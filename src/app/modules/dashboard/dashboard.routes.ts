import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'oee',
        loadComponent: () => import('./pages/oee/oee.component')
          .then(m => m.OeeComponent)
      },
      
      {
        path: 'safety',
        loadComponent: () => import('./pages/safety/safety.component')
          .then(m => m.SafetyComponent)
      },
      {
        path: 'giveaway',
        loadComponent: () => import('./pages/giveaway/giveaway.component')
          .then(m => m.GiveawayComponent)
      },
      {
        path: 'eii',
        loadComponent: () => import('./pages/monthlyeii/monthly-eii.component')
          .then(m => m.MonthyEiiComponent)
      },
      { 
        path: '', 
        redirectTo: 'oee', 
        pathMatch: 'full' 
      }
    ]
  }
];