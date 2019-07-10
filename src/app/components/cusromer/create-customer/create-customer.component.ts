import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { UserType } from 'src/app/enum/user-type.enum';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  createCustomer(form: NgForm) {

    let customer: Customer = {
      customerName: form.value.customerName,
      user: {
        username: form.value.username,
        userPassword: form.value.password,
        userClientType: UserType.CUSTOMER
      }
    }

    this.customerService.createCustomer(customer)
      .subscribe((result) => {
        if (`Result: ${result.status == 200}`) {
          alert("Customer was created successfuly!")
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

}
