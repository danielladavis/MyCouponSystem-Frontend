import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { LoginService } from 'src/app/services/login.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UserType } from 'src/app/enum/user-type.enum';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-company-customers',
  templateUrl: './company-customers.component.html',
  styleUrls: ['./company-customers.component.css']
})
export class CompanyCustomersComponent implements OnInit {

  customers: Customer[] = [];
  company: Company = new Company();
  isAdmin: boolean = false;
  isCustomerExsist: boolean = false;

  constructor(private userService: UserService, private loginService: LoginService, private customerService: CustomerService) { }

  ngOnInit() {
    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 0) {
      this.isAdmin = true;
    }

    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 1) {
      this.isCustomerExsist = true;

      this.userService.getUserByName(this.loginService.loggedInUser.userName).subscribe(
        (result) => {
          this.company = result.company;
          this.companyCustomers(this.company.companyID);
        }, (error) => {
          alert(`Error: ${error.error.errorMessage}`)
        })
    }
  }

  getCompanyCustomers(form: NgForm) {
    this.isCustomerExsist = false;
    this.companyCustomers(form.value.companyID);
  }

  companyCustomers(companyID: number) {
    this.customerService.getCompanyCustomers(companyID).subscribe(
      (result) => {
        this.customers = result;
        if (this.customers.length <= 0) {
          alert("No customers found")
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
