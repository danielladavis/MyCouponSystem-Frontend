import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/enum/user-type.enum';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { UserService } from 'src/app/services/user.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-company-customer-by-name',
  templateUrl: './company-customer-by-name.component.html',
  styleUrls: ['./company-customer-by-name.component.css']
})
export class CompanyCustomerByNameComponent implements OnInit {

  customer: Customer = new Customer();
  company: Company = new Company();
  isCustomerExsist: boolean = false;
  isAdmin: boolean = false;

  constructor(private userService: UserService, private loginService: LoginService, private customerService: CustomerService) { }

  ngOnInit() {
    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 0) {
      this.isAdmin = true;
    }

    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 1) {
      this.userService.getUserByName(this.loginService.loggedInUser.userName).subscribe(
        (result) => {
          this.company = result.company;
        }, (error) => {
          alert(`Error: ${error.error.errorMessage}`)
        })
    }
  }

  getCompanyCustomer(form: NgForm) {
    this.isCustomerExsist = false;

    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 0) {
      this.company.companyID = form.value.companyID
    }

    this.customerService.getCompanyCustomer(this.company.companyID, form.value.customerName).subscribe(
      (result) => {
        this.customer = result;
        if (this.customer == null) {
          alert("Error: Customer does not exsist!")
        } else {
          this.isCustomerExsist = true;
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

  removeCustomer(customer: Customer) {
    this.customerService.removeCustomer(customer.user.userID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.isCustomerExsist = false;
          alert("Customer was removed successfuly!")
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

}
