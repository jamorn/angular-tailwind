import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { OeeComponent } from './pages/oee/oee.component';
import { OeeEntryComponent } from './pages/oee-entry/oee-entry.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    DashboardComponent,
    OeeComponent,
    OeeEntryComponent
  ]
})
export class DashboardModule { }
