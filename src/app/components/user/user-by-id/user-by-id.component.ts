import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { CustomerService } from 'src/app/services/customer.service';
import { UserType } from 'src/app/enum/user-type.enum';

@Component({
  selector: 'app-user-by-id',
  templateUrl: './user-by-id.component.html',
  styleUrls: ['./user-by-id.component.css']
})
export class UserByIdComponent implements OnInit {

  user: User = new User();
  isUserExsist: boolean = false;
  showCompanyInfoModal: boolean = false;

  constructor(private userService: UserService, private customerService: CustomerService) { }

  ngOnInit() {
  }

  getUserById(form: NgForm) {
    this.isUserExsist = false;

    this.userService.getUserById(form.value.userID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.user = result.body;
          this.isUserExsist = true;
        }
      }, (error) => {
        this.isUserExsist = false;
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
