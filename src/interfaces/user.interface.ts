export interface UserI {
  name: string;
  surname: string;
  email: string;
  password?: string;
  emailVerified: boolean;
  status: string;
  refreshToken: string;
}
