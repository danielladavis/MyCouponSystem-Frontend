import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { UserType } from 'src/app/enum/user-type.enum';
import { NgForm } from '@angular/forms';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-company-employee-by-name',
  templateUrl: './company-employee-by-name.component.html',
  styleUrls: ['./company-employee-by-name.component.css']
})
export class CompanyEmployeeByNameComponent implements OnInit {

  selectedCompany: Company = new Company();
  user: User = new User();
  showCompanyInfoModal: boolean = false;
  isAdmin: boolean = false;
  isCouponExsist: boolean = false;

  constructor(private userService: UserService, private loginService: LoginService) { }

  ngOnInit() {
    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 0) {
      this.isAdmin = true;
    }
  }

  getCompanyEmployee(form: NgForm) {
    this.isCouponExsist = false;

    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 0) {
      this.selectedCompany.companyID = form.value.companyID
    }

    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 1) {
      this.getUserByName(this.loginService.loggedInUser.userName);
    }

    this.userService.getCompanyEmployee(this.selectedCompany.companyID, form.value.username).subscribe(
      (result) => {
        this.user = result;
        if (this.user == null) {
          alert("Error: User does not exsist!");
          this.isCouponExsist = false;
        } else {
          this.isCouponExsist = true;
        }
      },
      (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

  getUserByName(username: string) {
    this.userService.getUserByName(username).subscribe(
      (result) => {
        if (result == null) {
          alert("Error: User does not exsist!")
        } else {
          this.selectedCompany = result.company;
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

  openCompanyInfo(company: Company) {
    this.selectedCompany = company;
    this.showCompanyInfoModal = !this.showCompanyInfoModal;
  }

  removeUser(user: User) {
    this.userService.removeUser(user.userID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.isCouponExsist = false;
          alert("User was removed successfuly!")
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

}
