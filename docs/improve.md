จากโค้ด AuthService
1. เพิ่ม HTTP Interceptor สำหรับเพิ่ม Header อัตโนมัติ

ors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get test user from storage
    const testUser = this.authService.getTestUser();
    
    if (testUser) {
      // Clone the request and add the test user header
      request = request.clone({
        setHeaders: {
          'X-Test-User': testUser
        }
      });
    }

    return next.handle(request);
  }
}
2. ปรับปรุง app.module.ts เพื่อใช้งาน Interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  // ...existing code...
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})

3. ปรับปรุง AuthService เพื่อจัดการ User Token
export class AuthService {
  // ...existing code...

  // เพิ่ม method สำหรับเก็บ user token
  setUserToken(user: string): void {
    localStorage.setItem(this.TEST_USER_KEY, user);
  }

  // เพิ่ม method สำหรับดึง user email
  getUserEmail(): string | null {
    const user = this.getUserFromStorage();
    return user?.email || null;
  }

  // ปรับปรุง login method
  login(username: string, password: string): Observable<AuthTestResponse> {
    return new Observable<AuthTestResponse>(observer => {
      const testUser = this.testUsers[username];
      if (testUser && testUser.password === password) {
        const response: AuthTestResponse = {
          success: true,
          user: testUser.user
        };
        
        // เก็บ test user token
        this.setUserToken(testUser.user.roles[0]); // เก็บ role แรกเป็น test user
        
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
        localStorage.setItem(this.LAST_ACTIVITY_KEY, Date.now().toString());
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next(response.user);
        observer.next(response);
      } else {
        observer.error({ success: false, message: 'Invalid credentials' });
      }
      observer.complete();
    });
  }
}

4. Backend จะรู้ user ที่ login ได้จาก
Header 'X-Test-User' ที่ส่งมาจาก AuthInterceptor
Method GetLatestForUpdate ใน DashboardController จะแปลง test user เป็น email ตามนี้:

public async Task<IActionResult> GetLatestForUpdate(int machineId)
{
    string? userEmail = null;
    if (Request.Headers.TryGetValue("X-Test-User", out var testUser))
    {
        string user = testUser.ToString().ToLower();
        switch (user)
        {
            case "admin":
                userEmail = "kittithuch.u@irpc.co.th";
                break;
            case "user": 
                userEmail = "weerachai.in@irpc.co.th";
                break;
            case "super":
                userEmail = "nirut.p@irpc.co.th";
                break;
            default:
                userEmail = User?.Identity?.Name;
                break;
        }
    }
    // ...existing code...
}