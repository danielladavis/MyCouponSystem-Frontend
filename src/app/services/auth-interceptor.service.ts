import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.loginService.loggedInUser != null) {
      const authToken = this.loginService.loggedInUser.token;
      const authRequest = req.clone({
        params: req.params.set('token', authToken)
      })
      return next.handle(authRequest)
    } else {
      return next.handle(req);
    }
  }

}
