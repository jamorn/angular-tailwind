import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

// Extract role type from UserInfo interface
type UserRole = UserInfo['roles'][number];

interface UserInfo {
  empId: string;
  name: string;
  email: string;
  roles: Array<'admin' | 'user' | 'super'>;  // Specific role types
}

interface AuthTestResponse {
  success: boolean;
  user: UserInfo;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'auth_user';
  private readonly TEST_USER_KEY = 'X-Test-User';
  private readonly SESSION_TIMEOUT = 1800000; // 30 minutes in milliseconds
  private readonly LAST_ACTIVITY_KEY = 'last_activity';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<UserInfo | null>(this.getUserFromStorage());

  constructor(
    private http: HttpClient, 
    private router: Router
  ) {
    // Check authentication status on service init
    this.checkAuthStatus();
  }

  // Development mode test login
  testLogin(testUser: 'admin' | 'user' | 'super'): Observable<AuthTestResponse> {
    return this.http.get<AuthTestResponse>(
      `${environment.apiUrl}/api/auth/test-login`,
      { headers: { 'X-Test-User': testUser } }
    ).pipe(
      tap(response => {
        if (response.success) {
          localStorage.setItem(this.TEST_USER_KEY, testUser);
          localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
          this.isAuthenticatedSubject.next(true);
          this.currentUserSubject.next(response.user);
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        this.isAuthenticatedSubject.next(false);
        this.currentUserSubject.next(null);
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TEST_USER_KEY);
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getCurrentUser(): Observable<UserInfo | null> {
    return this.currentUserSubject.asObservable();
  }

  getTestUser(): string | null {
    return localStorage.getItem(this.TEST_USER_KEY);
  }

  isAdmin(): boolean {
    const user = this.getUserFromStorage();
    return user?.roles?.includes('admin') ?? false;
  }

  hasRole(role: UserRole): boolean {
    const user = this.getUserFromStorage();
    return user?.roles?.includes(role) ?? false;
  }

  hasAnyRole(roles: UserRole[]): boolean {
    const user = this.getUserFromStorage();
    return user?.roles?.some(role => roles.includes(role)) ?? false;
  }

  private checkAuthStatus(): void {
    if (!this.checkSessionTimeout()) {
      return;
    }
    // For development testing
    const testUser = this.getTestUser();
    if (testUser) {
      this.isAuthenticatedSubject.next(true);
      return;
    }

    // For production Windows Auth
    this.http.get<AuthTestResponse>(`${environment.apiUrl}/api/auth/status`)
      .subscribe({
        next: (response) => {
          if (response.success) {
            localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
            this.isAuthenticatedSubject.next(true);
            this.currentUserSubject.next(response.user);
          }
        },
        error: () => {
          this.isAuthenticatedSubject.next(false);
          this.currentUserSubject.next(null);
        }
      });
  }

  private checkSessionTimeout(): boolean {
    const lastActivity = localStorage.getItem(this.LAST_ACTIVITY_KEY);
    if (!lastActivity) return false;

    const now = Date.now();
    const timeSinceLastActivity = now - parseInt(lastActivity, 10);

    if (timeSinceLastActivity > this.SESSION_TIMEOUT) {
      this.logout();
      return false;
    }

    localStorage.setItem(this.LAST_ACTIVITY_KEY, now.toString());
    return true;
  }

  private getUserFromStorage(): UserInfo | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }
}