import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = 'http://localhost:8080';
  requestHeader = new HttpHeaders({'No-Auth': 'True'});

  constructor(
    private httpclient: HttpClient,
    private userAuthService : UserAuthService
  ) { }

  public register(registerData: NgForm){
    return this.httpclient.post(this.PATH_OF_API+'/registerNewUser',registerData);
  }

  public login(loginData: NgForm){
    return this.httpclient.post(this.PATH_OF_API+'/authenticate',loginData,{
      headers: this.requestHeader,
    });
  }
  
  public forUser(){
    return this.httpclient.get(this.PATH_OF_API+'/forUser', {responseType: 'text'});
  }
  
  public forAdmin(){
    return this.httpclient.get(this.PATH_OF_API+'/forAdmin', {responseType: 'text'});
  }

  public roleMatch(allowedRoles: string[]): Boolean{
    let isMatch = false
    const userRole: any = this.userAuthService.getRoles();

    if(userRole){
      for(let i = 0; i < userRole.length; i++){
        for(let j = 0; j < allowedRoles.length; j++){
          if(userRole[i].roleName === allowedRoles[j])
            isMatch = true;
        }
      }
    }

    return isMatch;
  }
}
