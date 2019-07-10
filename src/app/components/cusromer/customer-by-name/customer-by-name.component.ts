import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-by-name',
  templateUrl: './customer-by-name.component.html',
  styleUrls: ['./customer-by-name.component.css']
})
export class CustomerByNameComponent implements OnInit {

  customer: Customer = new Customer();
  isCustomerExsist: boolean = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  getCustomerByName(form: NgForm) {
    this.isCustomerExsist = false;

    this.customerService.getCustomerByName(form.value.customerName).subscribe(
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
