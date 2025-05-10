import { Routes } from '@angular/router';
import { UserInfo } from '@models/auth/auth.model';
import { AuthService } from '@services/auth/auth.service';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    children: [
      { 
        path: 'login',
        loadComponent: () => import('./pages/login/login.component')
          .then(m => m.LoginComponent)
      },
      { 
        path: 'sign-up',
        loadComponent: () => import('./pages/sign-up/sign-up.component')
          .then(m => m.SignUpComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./pages/forgot-password/forgot-password.component')
          .then(m => m.ForgotPasswordComponent)
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];