import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '@environments/environment';
import { UserResponse } from '@models/user/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get normal user with Windows Authentication', () => {
    const mockResponse: UserResponse = {
      success: true,
      user: {
        empId: "1102",
        name: "Mr. Weerachai Inthirach",
        email: "weerachai.in@irpc.co.th",
        roles: ["user"]
      }
    };

    service.getCurrentUser().subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(response.user?.roles).toContain('user');
      expect(response.user?.roles).not.toContain('admin');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/auth/GetCurrentUser`);
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBeTrue();
    req.flush(mockResponse);
  });

  it('should get admin user with Windows Authentication', () => {
    const mockResponse: UserResponse = {
      success: true,
      user: {
        empId: "557",
        name: "Mr. Kittithuch U.",
        email: "kittithuch.u@irpc.co.th",
        roles: ["admin", "user"]
      }
    };

    service.getCurrentUser().subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(response.user?.roles).toContain('admin');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/auth/GetCurrentUser`);
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBeTrue();
    req.flush(mockResponse);
  });
});