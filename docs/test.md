จะทดสอบกับ angular อย่างไร กับ Frontend เมื่อ angular เรียก GetCurrentUser
ครั้งที่ 1 จำลองเป็น user ทั่วไป
ครั้งที่ 2 จำลองเป็น มีมีสิทธิใน database

// user.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get normal user', () => {
    // จำลองข้อมูล user ทั่วไป
    const mockNormalUser = {
      id: 1,
      username: 'user1',
      role: 'user',
      permissions: []
    };

    service.getCurrentUser().subscribe(user => {
      expect(user).toEqual(mockNormalUser);
    });

    const req = httpMock.expectOne('/api/users/current');
    expect(req.request.method).toBe('GET');
    req.flush(mockNormalUser);
  });

  it('should get admin user with database permissions', () => {
    // จำลองข้อมูล user ที่มีสิทธิ์ database
    const mockAdminUser = {
      id: 2,
      username: 'admin1',
      role: 'admin',
      permissions: ['database.read', 'database.write']
    };

    service.getCurrentUser().subscribe(user => {
      expect(user).toEqual(mockAdminUser);
      expect(user.permissions).toContain('database.read');
      expect(user.permissions).toContain('database.write');
    });

    const req = httpMock.expectOne('/api/users/current');
    expect(req.request.method).toBe('GET');
    req.flush(mockAdminUser);
  });
});

// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<any> {
    return this.http.get('/api/users/current');
  }
}

// app.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="currentUser">
      <h2>Welcome {{ currentUser.username }}</h2>
      <div *ngIf="hasDatabasePermission">
        <p>You have database access</p>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  currentUser: any;
  hasDatabasePermission = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.hasDatabasePermission = user.permissions?.includes('database.read');
    });
  }
}

// app.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getCurrentUser']);
    
    await TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should show normal user without database permission', () => {
    const mockUser = {
      username: 'user1',
      permissions: []
    };
    userService.getCurrentUser.and.returnValue(of(mockUser));

    fixture.detectChanges();

    expect(component.currentUser).toEqual(mockUser);
    expect(component.hasDatabasePermission).toBeFalse();
  });

  it('should show admin user with database permission', () => {
    const mockUser = {
      username: 'admin1',
      permissions: ['database.read', 'database.write']
    };
    userService.getCurrentUser.and.returnValue(of(mockUser));

    fixture.detectChanges();

    expect(component.currentUser).toEqual(mockUser);
    expect(component.hasDatabasePermission).toBeTrue();
  });
});

คำอธิบาย:

สร้าง UserService สำหรับเรียก API getCurrentUser

ทดสอบ Service:

ทดสอบกรณี user ทั่วไปที่ไม่มีสิทธิ์
ทดสอบกรณี admin ที่มีสิทธิ์ database
สร้าง Component ที่ใช้ UserService:
แสดงข้อมูล user
แสดง/ซ่อนส่วนที่ต้องมีสิทธิ์ database
ทดสอบ Component:
ทดสอบการแสดงผลกรณี user ทั่วไป
ทดสอบการแสดงผลกรณี admin

วิธีรัน Test:
ng test