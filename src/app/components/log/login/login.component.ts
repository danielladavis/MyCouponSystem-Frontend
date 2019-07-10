import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';
import { UserType } from 'src/app/enum/user-type.enum';
import { UserLogin } from 'src/app/models/user-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output()
  toggleLoginRegisterView = new EventEmitter();
  isValid: boolean = undefined;
  userType = UserType;

  constructor(private loginSerivce: LoginService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {

    let userLogin: UserLogin = {
      userName: form.value.username,
      userPassword: form.value.password
    }

    this.loginSerivce.login(userLogin)
      .subscribe((result: boolean) => {
        result == true ? this.router.navigate(['/home']) : this.isValid = false;
      }, (error) => {
        this.isValid = false;
      })
  }

  emitToggleView() {
    this.toggleLoginRegisterView.emit();
  }

}
