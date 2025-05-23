import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import currentUserData from '../data/currentUser.json';

@Injectable()
export class FakeApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (request.url.endsWith('/api/auth/current-user')) {
      return of(new HttpResponse({ status: 200, body: currentUserData }));
    }
    return next.handle(request);
  }
}