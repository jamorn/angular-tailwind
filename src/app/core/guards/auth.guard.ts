import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { map, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate() {
    return this.authService.getCurrentUser().pipe(
      map(response => {
        if (response.success && response.user) {
          return true;
        }
        // ถ้าไม่มีสิทธิ์ให้ไปที่ 403 แทน login
        this.router.navigate(['/errors/403']);
        return false;
      }),
      catchError(() => {
        // กรณี error ให้แสดงเฉพาะ public menu
        return of(true);
      })
    );
  }
}

export const authGuardFn: CanActivateFn = () => {
  return inject(AuthGuard).canActivate();
};