import { Routes } from '@angular/router';
import { authGuardFn } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.routes')
      .then(m => m.ADMIN_ROUTES)
  },
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.routes')
      .then(m => m.LAYOUT_ROUTES),
    canActivate: [authGuardFn]
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes')
      .then(m => m.AUTH_ROUTES)
  },
  {
    path: 'errors',
    loadChildren: () => import('./modules/error/error.routes')
      .then(m => m.ERROR_ROUTES)
  },
  { path: '**', redirectTo: 'errors/404' }
];
