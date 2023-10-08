import { Component } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private userAuthService: UserAuthService,
    public userService: UserService,
    private router: Router
  ){}

  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }
}
