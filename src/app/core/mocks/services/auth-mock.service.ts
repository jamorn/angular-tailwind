import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import currentUserData from '../data/currentUser.json';

@Injectable({
  providedIn: 'root'
})
export class AuthMockService {
  getCurrentUser(): Observable<any> {
    return of(currentUserData);
  }
}