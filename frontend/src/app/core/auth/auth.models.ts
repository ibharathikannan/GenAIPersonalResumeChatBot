export interface AuthenticatedUser {
  id: number;
  email: string;
  userName: string;
  subsidiaryId: number;
}

export class AuthenticationModel {
  login: string;
  password: string;
}
