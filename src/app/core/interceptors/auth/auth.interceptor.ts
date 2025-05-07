import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
//import { AuthService } from '@shared/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
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