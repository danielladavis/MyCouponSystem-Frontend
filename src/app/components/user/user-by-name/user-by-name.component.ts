import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UserType } from 'src/app/enum/user-type.enum';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-user-by-name',
  templateUrl: './user-by-name.component.html',
  styleUrls: ['./user-by-name.component.css']
})
export class UserByNameComponent implements OnInit {

  customer: Customer = new Customer();
  user: User = new User();
  isUserExsist: boolean = false;
  isCompanyOrCustomer: boolean = false;
  isCustomer: boolean = false;
  showCompanyInfoModal: boolean = false;

  constructor(private customerService: CustomerService, private userService: UserService, private loginService: LoginService) { }

  ngOnInit() {
    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 1) {
      this.isCompanyOrCustomer = true;
      this.userByName(this.loginService.loggedInUser.userName);
    }

    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 2) {
      this.isCompanyOrCustomer = true;
      this.userByName(this.loginService.loggedInUser.userName);
    }
  }

  getUserByName(form: NgForm) {
    this.isUserExsist = false;
    this.userByName(form.value.username)
  }

  userByName(username: string) {
    this.userService.getUserByName(username).subscribe(
      (result) => {
        this.user = result;
        if (this.user == null) {
          alert("Error: User does not exsist!")
        } else {
          this.isUserExsist = true;
          if (Number(UserType[this.loginService.loggedInUser.clientType]) == 2) {
            this.isUserExsist = false;
            this.customerById(this.user.userID);
          }
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

  customerById(userID: number) {
    this.customerService.getCustomerById(userID)
      .subscribe(
        (result) => {
          if (`Result: ${result.status == 200}`) {
            this.customer = result.body;
            this.isCustomer = true;
          }
        }, (error) => {
          this.isCustomer = false;
          alert(`Error: ${error.error.errorMessage}`)
        })
  }

  openCompanyInfo() {
    this.showCompanyInfoModal = !this.showCompanyInfoModal;
  }


  removeUser(user: User) {
    if (user.userClientType.toString() == UserType[UserType.CUSTOMER]) {
      this.customerService.removeCustomer(user.userID).subscribe(
        (result) => {
          if (`Result: ${result.status == 200}`) {
            this.isUserExsist = false;
            alert("User was removed successfuly!")
          }
        }, (error) => {
          alert(`Error: ${error.error.errorMessage}`)
        })
    } else {
    this.userService.removeUser(user.userID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.isUserExsist = false;
          alert("User was removed successfuly!")
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
    }
  }

}
