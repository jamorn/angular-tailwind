export type UserRole = 'admin' | 'user';

export interface User {
    empId: string;        // รหัสพนักงาน (เช่น "1102")
    name: string;         // ชื่อภาษาอังกฤษ (เช่น "Mr. Weerachai Inthirach")
    email: string;        // อีเมล (เช่น "weerachai.in@irpc.co.th") 
    roles: UserRole[];    // สิทธิ์การใช้งาน (["admin", "user"] หรือ ["user"])
}

export interface UserResponse {
    success: boolean;
    user: User | null;
}

export interface ErrorResponse {
    message: string;
}