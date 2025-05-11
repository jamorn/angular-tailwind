import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '@guards/auth.guard';


export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
    children: [
      {
        path: 'entry/oee',  // เปลี่ยนจาก nested children เป็น direct path
        loadComponent: () => import('./entry/oee/oee-entry.component')
          .then(m => m.OeeEntryComponent)
      }
    ]
  }
];