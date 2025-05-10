import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '@guards/auth.guard';

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

@NgModule({
  imports: [RouterModule.forChild(LAYOUT_ROUTES)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
