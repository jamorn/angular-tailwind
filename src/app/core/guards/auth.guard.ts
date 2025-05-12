import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    try {
      if (this.authService.isAuthenticated()) {
        return true;
      }
      
      // Add logging for debugging
      console.log('Authentication failed, redirecting to login');
      this.router.navigate(['/auth/login']);
      return false;
      
    } catch (error) {
      console.error('Auth Guard Error:', error);
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}

export const authGuardFn: CanActivateFn = () => {
  return inject(AuthGuard).canActivate();
};