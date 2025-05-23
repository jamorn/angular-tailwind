import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '@guards/auth.guard';
import { OeeEntryComponent } from '@admin-entry/oee/oee-entry.component';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Default path ไปที่ dashboard/oee
      { 
        path: '', 
        redirectTo: 'dashboard/oee', 
        pathMatch: 'full' 
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.routes')
          .then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'admin',
        canActivate: [() => inject(AuthGuard).canActivate()],
        children: [
          {
            path: '',
            redirectTo: 'users',
            pathMatch: 'full'
          }, {
            path: 'entry',  // เพิ่ม entry route
            children: [
              {
                path: 'oee',
                component: OeeEntryComponent,
                title: 'OEE Entry'
              }
            ]
          },
          {
            path: 'components',
            loadChildren: () => import('../uikit/uikit.routes')
              .then(m => m.UIKIT_ROUTES)
          }
        ]
      },
      // Wildcard route สำหรับ 404
      { path: '**', redirectTo: '../errors/404' }
    ]
  }
];
