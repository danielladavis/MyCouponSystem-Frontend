import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { UserType } from 'src/app/enum/user-type.enum';
import { NgForm } from '@angular/forms';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-all-company-users',
  templateUrl: './all-company-users.component.html',
  styleUrls: ['./all-company-users.component.css']
})
export class AllCompanyUsersComponent implements OnInit {

  users: User[] = [];
  selectedCompany: Company = new Company();
  isAdmin: boolean = false;
  isCouponExsist: boolean = false;
  showCompanyInfoModal: boolean = false;

  constructor(private userService: UserService, private loginService: LoginService) { }

  ngOnInit() {
    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 0) {
      this.isAdmin = true;
    }

    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 1) {
      this.userService.getUserByName(this.loginService.loggedInUser.userName).subscribe(
        (result) => {
          if (result == null) {
            alert("Error: User does not exsist!")
          } else {
            this.selectedCompany = result.company;
            this.companyEmployees(this.selectedCompany.companyID)
          }
        }, (error) => {
          alert(`Error: ${error.error.errorMessage}`)
        })
    }
  }

  getCompanyUsers(form: NgForm) {
    this.isCouponExsist = false;
    this.companyEmployees(form.value.companyID)
  }

  companyEmployees(companyID: number) {
    this.userService.getAllCompanyEmployees(companyID).subscribe(
      (result) => {
        this.users = result;
        if (this.users.length <= 0) {
          this.isCouponExsist = false;
          alert("No users found")
        } else {
          this.isCouponExsist = true;
        }
      },
      (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

  openCompanyInfo(company: Company) {
    this.selectedCompany = company;
    this.showCompanyInfoModal = !this.showCompanyInfoModal;
  }

  removeUser(tempUser: User) {
    this.userService.removeUser(tempUser.userID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.users.filter((user, index) => {
            if (user.userID == tempUser.userID) {
              this.users.splice(index, 1);
            }
          })
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

}
