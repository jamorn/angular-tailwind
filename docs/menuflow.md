"I'm working on an Angular project with these specifications:

Angular CLI version: 19.2.3
Using Standalone Components architecture (no NgModules)
Project location: D:\dashboard2025\Frontend
All components must be standalone: true
No module files (.module.ts) should be used
Routes configuration should use standalone approach
Environment: Visual Studio Code on Windows"
การแจ้งข้อมูลนี้จะช่วยให้ AI:

เสนอ code ที่เหมาะสมกับ Angular v19
แนะนำการใช้ Standalone APIs เท่านั้น
หลีกเลี่ยงการใช้ NgModule
ใช้ providers ที่ถูกต้องสำหรับ standalone architecture
แนะนำการ import ที่ถูกต้อง
ใช้ path aliases ที่เหมาะสมกับโปรเจค



import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Reports',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-bar.svg',
          label: 'Reports',
          route: '/dashboard',
          children: [
            { label: 'Safety', route: '/dashboard/safety' },
            { label: 'OEE', route: '/dashboard/oee' },
            { label: 'Giveaway', route: '/dashboard/giveaway' },
            { label: 'EII', route: '/dashboard/eii' }
          ],
        }
      ]
    },
    {
      group: 'Administration',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: '/admin',
          children: [
            { label: 'Users', route: '/admin/users' },
            { label: 'Roles', route: '/admin/roles' },
            { label: 'Permissions', route: '/admin/permissions' }
          ]
        },
        {
          icon: 'assets/icons/heroicons/outline/pencil-square.svg',
          label: 'Data Entry',
          route: '/admin/entry',
          children: [
            { label: 'OEE Entry', route: '/admin/entry/oee' },
            { label: 'Safety Entry', route: '/admin/entry/safety' },
            { label: 'Giveaway Entry', route: '/admin/entry/giveaway' }
          ]
        }
      ]
    }
  ];
}

# การจัดการ mene ให้ตรงกับสิทธิ

1. การตั้งค่า Angular สำหรับตรวจสอบ CurrentUser
   # สร้าง Auth Service ใน Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  empId: string;
  name: string;
  email: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<any> {
    return this.http.get<any>('/api/auth/getCurrentUser', { withCredentials: true })
      .pipe(
        tap(response => {
          if (response.success) {
            this.currentUserSubject.next(response.user);
          }
        })
      );
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.roles.includes('admin') ?? false;
  }
}

2. แก้ไข Menu Service เพื่อกรองตาม Role

import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { MenuItem } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private authService: AuthService) {}

  getFilteredMenu(): MenuItem[] {
    const isAdmin = this.authService.isAdmin();
    return Menu.pages.filter(group => {
      if (group.group === 'Administration' && !isAdmin) {
        return false;
      }
      return true;
    });
  }
}

3. แก้ไข App Component เพื่อโหลด User ตั้งแต่เริ่มต้น
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <app-layout *ngIf="isLoaded">
      <router-outlet></router-outlet>
    </app-layout>
  `
})
export class AppComponent implements OnInit {
  isLoaded = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe({
      next: () => {
        this.isLoaded = true;
      },
      error: (error) => {
        console.error('Authentication failed:', error);
        // Handle error (redirect to login, show error message, etc.)
      }
    });
  }
}

4. ใช้งานใน Navigation Component

import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  template: `
    <nav>
      <ng-container *ngFor="let group of filteredMenu">
        <div class="menu-group">
          <h3>{{group.group}}</h3>
          <ng-container *ngFor="let item of group.items">
            <!-- Your menu rendering logic -->
          </ng-container>
        </div>
      </ng-container>
    </nav>
  `
})
export class NavigationComponent {
  filteredMenu = this.menuService.getFilteredMenu();

  constructor(
    private menuService: MenuService,
    public authService: AuthService
  ) {}
}

5. HTTP Interceptor สำหรับจัดการ Authentication
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request.clone({
      withCredentials: true
    }));
  }
}