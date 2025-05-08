import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { OeeComponent } from './pages/oee/oee.component';
import { OeeEntryComponent } from './pages/oee-entry/oee-entry.component';
import { GiveawayComponent } from './pages/giveaway/giveaway.component';
import { MonthyEiiComponent } from './pages/mohthyeii/monthy-eii.component';
import { SafetyComponent } from './pages/safety/safety.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // Set OEE as default route
      { 
        path: '', 
        redirectTo: 'oee', 
        pathMatch: 'full' 
      },
      // Main OEE routes
      { 
        path: 'oee', 
        component: OeeComponent 
      },
      { 
        path: 'oee-entry', 
        component: OeeEntryComponent 
      },
      // Other report routes
      { 
        path: 'safety', 
        component: SafetyComponent 
      },
      { 
        path: 'giveaway', 
        component: GiveawayComponent 
      },
      { 
        path: 'eii', 
        component: MonthyEiiComponent 
      },
      // Wildcard route
      { 
        path: '**', 
        redirectTo: 'errors/404' 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
