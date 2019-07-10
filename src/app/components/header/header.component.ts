import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { UserType } from 'src/app/enum/user-type.enum';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userType: UserType;
  subscription: Subscription;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.subscription = this.loginService.isUserLegitimateSub
      .subscribe(() => {
        this.userType = Number(UserType[this.loginService.loggedInUser.clientType]);
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.userType = undefined;
  }

}
