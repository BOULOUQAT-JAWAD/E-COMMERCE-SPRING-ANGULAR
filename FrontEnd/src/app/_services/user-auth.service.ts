import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: []){
    localStorage.setItem('roles',JSON.stringify(roles));
  }

  public getRoles(): [] {
    const rolesJSON = localStorage.getItem('roles');
  
    if (rolesJSON === null) {
      return [];
    }
  
    return JSON.parse(rolesJSON);
  }

  public setToken(jwtToken: string){
    localStorage.setItem('jwtToken',jwtToken);
  }

  public getToken(): string {
    const rolesJSON = localStorage.getItem('jwtToken');
  
    if (rolesJSON === null) {
      return '';
    }
  
    return rolesJSON;
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}
