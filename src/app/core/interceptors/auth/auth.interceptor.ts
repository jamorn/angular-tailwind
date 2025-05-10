import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const testUser = this.authService.getTestUser();
    
    if (testUser) {
      request = request.clone({
        setHeaders: {
          'X-Test-User': testUser
        }
      });
    }

    return next.handle(request);
  }
}