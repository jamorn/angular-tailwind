JSON Response จาก GetCurrentUser()
Success Response (200 OK)
{
    "success": true,
    "user": {
        "empId": "1102",
        "name": "Mr. Weerachai Inthirach",
        "email": "weerachai.in@irpc.co.th",
        "roles": ["user"]
    }
}
Error Responses
1. ไม่ได้ Authentication (401 Unauthorized)
{
    "message": "Not authenticated"
}
2. ไม่พบข้อมูลพนักงาน (401 Unauthorized)
{
    "message": "Employee not found"
}

3. Server Error (500 Internal Server Error)
{
    "message": "Error message details..."
}

หมายเหตุ:
roles จะเป็น ["admin", "user"] ถ้า employee.Role เป็น "admin"
roles จะเป็น ["user"] สำหรับ role อื่นๆ
Response ทั้งหมดจะเป็น application/json content type

# User Model Structure

export interface User {
    empId: string;        // รหัสพนักงาน (เช่น "1102")
    name: string;         // ชื่อภาษาอังกฤษ (เช่น "Mr. Weerachai Inthirach")
    email: string;        // อีเมล (เช่น "weerachai.in@irpc.co.th")
    roles: string[];      // สิทธิ์การใช้งาน (["admin", "user"] หรือ ["user"])
}

export interface UserResponse {
    success: boolean;
    user: User;
}

// Optional: สำหรับการ login ด้วย form
export interface LoginCredentials {
    username: string;     // email สำหรับ login
    password: string;     // password สำหรับ login
}

// Optional: สำหรับการจัดการ error
export interface ErrorResponse {
    message: string;
}

การใช้งาน

import { User, UserResponse, LoginCredentials, ErrorResponse } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {}

    getCurrentUser(): Observable<UserResponse> {
        return this.http.get<UserResponse>('/api/auth/getCurrentUser', {
            withCredentials: true
        }).pipe(
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