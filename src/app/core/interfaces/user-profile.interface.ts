export interface UserPhotoResponse {
  success: boolean;
  message: null | string;
  user: UserInfo;
  windowsUser: WindowsUserInfo;
}

export interface UserInfo {
  empId: string;
  name: string;
  email: string;
  role: string;
  unit: string;
  photo: string;
}

export interface WindowsUserInfo {
  name: string;
  domain: string;
  username: string;
  photo: string;
}