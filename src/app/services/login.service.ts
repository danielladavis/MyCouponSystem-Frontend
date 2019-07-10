import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from 'src/app/models/user-login';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = "http://localhost:8080/users";
  isUserLegitimateSub = new Subject<boolean>();
  loggedInUser: UserLogin = null;
  isUserLegitimate: boolean = false;

  constructor(private httpClient: HttpClient) { }

  login(userLogin: UserLogin) {
    return this.httpClient.post(`${this.url}/login`, userLogin)
      .pipe(map((result: UserLogin) => {

        if (result.token != '') {

          this.isUserLegitimate = true;

          this.loggedInUser = {
            token: result.token,
            userName: result.userName,
            clientType: result.clientType
          }
          this.isUserLegitimateSub.next(true);
        }
        return this.isUserLegitimate;
      }));
  }

  getIsLegitimate() {
    return this.isUserLegitimate;
  }

}
