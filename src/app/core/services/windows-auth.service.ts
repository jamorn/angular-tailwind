import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

interface WindowsUser {
  name: string;
  domain: string;
  username: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: {
    empId: string;
    name: string;
    email: string;
    role: string;
    unit: string;
  };
  windowsUser: WindowsUser;
}

@Injectable({
  providedIn: 'root'
})
export class WindowsAuthService {
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${environment.apiUrl}/api/Auth/GetCurrentUser`)
      .pipe(
        tap(response => this.currentUserSubject.next(response))
      );
  }

  isAuthenticated(): Observable<boolean> {
    return this.currentUser$.pipe(
      map(user => user?.success ?? false)
    );
  }
}