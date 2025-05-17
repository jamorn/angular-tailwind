import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { authGuardFn } from './core/guards/auth.guard';
import { adminGuardFn } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/oee',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.routes')
      .then(m => m.LAYOUT_ROUTES)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.routes')
      .then(m => m.ADMIN_ROUTES),
    canActivate: [adminGuardFn]
  },
  {
    path: 'errors',
    loadChildren: () => import('./modules/error/error.routes')
      .then(m => m.ERROR_ROUTES)
  },
  { 
    path: '**', 
    redirectTo: 'errors/404' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
