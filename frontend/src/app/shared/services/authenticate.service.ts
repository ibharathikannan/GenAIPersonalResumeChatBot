import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationModel } from '@app/core/auth/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService extends BaseService {
  private service: string;
  private token = 'token';

  isForgetPasswordTriggered = false;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private readonly http: HttpClient) {
    super();
    this.service = this.api + 'AuthenticationService';
  }

  authenticate(authentication: AuthenticationModel) {
    return this.http.post(`${this.service}/Authenticate`, authentication);
  }

  getAuthenticatedUserId() {
    return this.http.get(`${this.service}/GetAuthenticatedUserId`);
  }

  getAuthenticatedUser() {
    return this.http.get(`${this.service}/GetAuthenticatedUser`, this.headers);
  }

  getAuthenticatedUserCountryCode() {
    return this.http.get(`${this.service}/GetAuthenticatedUserSub`);
  }
  
  getToken() {    
    var token = null;
    var auth = JSON.parse(localStorage.getItem(`${'EUS-'}${'AUTH'}`))

    if(auth && auth.isAuthenticated){
      token = auth.token;
    }
    return token;
  }

  /* isAuthenticated move to ngrx actions
  isAuthenticated() {
    return this.getToken() !== null;
  }
  */
  logout() {
    this.http.post(`${this.service}/Logout`, {});
  }

  checkPassword(password: string) {
    return this.http.post<boolean>(`${this.service}/CheckPassword?password=${password}`, null);
  }

  changePassword(oldPassword: string, newPassword: string) {
    const param = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    return this.http.post(`${this.service}/ChangePassword`, param);
  }

  isEmailExists(email: string) {
    const param = {
      email: email
    };
    return this.http.post<boolean>(
      `${this.service}/isEmailExists`,
      param
    );
  }

  getUserRoleList() {
    return this.http.get(`${this.service}/GetUserRoleList`, this.headers);
  }

  getUserRoleMenuID(role: string) { 
    let param = { role: role };
    return this.http.post(`${this.service}/GetUserRoleMenuID`, param, this.headers);
  }
}
