export interface UserInfo {
    empId: string;
    name: string;
    email: string;
    roles: Array<'admin' | 'user' | 'super'>;
  }
  
  export type UserRole = UserInfo['roles'][number];
  
  export interface AuthTestResponse {
    success: boolean;
    user: UserInfo;
  }