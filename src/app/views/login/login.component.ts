import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('username');
  }
  user = new User('', '', '', '');
  isLogged = false;
  message = '';
  login(formUser) {

    this.user = formUser;
    this.user.userName = '';
    console.log(this.user);
     this.loginService.authentication(this.user).subscribe((userFromServer: User[] ) => {
      if (userFromServer != null && userFromServer !== undefined && userFromServer.length !== 0) {
      console.log('userFromServer=' + userFromServer[0].role);
      if (this.user.userId === userFromServer[0].userId) {
        this.user = userFromServer[0];
        console.log('logined user role is ' + this.user.role);
        this.user.password = '';
        // navigate to home
        sessionStorage.setItem('userId', this.user.userId);
        sessionStorage.setItem('role', this.user.role);
        sessionStorage.setItem('username', this.user.userName);
        this.router.navigate(['/dashboard']);

      }
    } else {
      this.message =   'Invalid user name or password';
      this.user = new User('', '', '', '');
    }
    });
  }
 }
