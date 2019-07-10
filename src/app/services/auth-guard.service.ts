import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (!this.loginService.getIsLegitimate() && state.url == '/login') {
      return true;
    } else if (this.loginService.getIsLegitimate() && state.url != '/login') {
      return true;
    } else if (this.loginService.getIsLegitimate() && state.url == '/login') {
      return false;
    } else {
      this.router.navigate(['/login'])
    }
  }

}
