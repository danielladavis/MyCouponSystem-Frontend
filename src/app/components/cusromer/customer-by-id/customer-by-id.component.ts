import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-by-id',
  templateUrl: './customer-by-id.component.html',
  styleUrls: ['./customer-by-id.component.css']
})
export class CustomerByIDComponent implements OnInit {

  customer: Customer = new Customer();
  isCustomerExsist: boolean = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  getCustomerById(form: NgForm) {
    this.isCustomerExsist = false;

    this.customerService.getCustomerById(form.value.customerID)
      .subscribe(
        (result) => {
          if (`Result: ${result.status == 200}`) {
            this.customer = result.body;
            this.isCustomerExsist = true;
          }
        }, (error) => {
          this.isCustomerExsist = false;
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
