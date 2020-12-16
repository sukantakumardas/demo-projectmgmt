import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../../model/user.model';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }
  configUrl = 'http://localhost:3000/users';

authentication(user: User) {
    const url = this.configUrl + '?userId=' + user.userId + '&password=' + user.password;
  console.log('URL is ' + url);
    return this.http.get(url);
}
getUsers() {
  return this.http.get(this.configUrl);
}
}
