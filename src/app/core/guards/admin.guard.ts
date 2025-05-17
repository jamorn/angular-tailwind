import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { User, UserResponse } from '@models/user/user.model';  // เพิ่ม UserResponse

export const adminGuardFn: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getCurrentUser().pipe(
    map((response: UserResponse) => {  // ระบุ type เป็น UserResponse
      if (!response || !response.success || !response.user) {
        router.navigate(['/errors/403']);
        return false;
      }

      if (response.user.roles.includes('admin')) {
        return true;
      }

      router.navigate(['/errors/403']);
      return false;
    })
  );
};
