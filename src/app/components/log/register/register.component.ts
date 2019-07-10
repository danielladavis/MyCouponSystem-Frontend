import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { UserType } from 'src/app/enum/user-type.enum';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output()
  toggleLoginRegisterView = new EventEmitter();
  showenValue: string = "";
  isUsername: boolean = undefined;
  isCustomerName: boolean = undefined;
  isValid: boolean = undefined;
  isPassword: boolean = undefined;


  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  emitToggleView() {
    this.toggleLoginRegisterView.emit();
  }

  onRegister(form: NgForm) {

    let customer: Customer = {
      customerName: form.value.fullName,
      user: {
        username: form.value.username,
        userPassword: form.value.password,
        userClientType: UserType.CUSTOMER
      }
    }

    if (form.value.password === form.value.confirmPassword) {
      this.isPassword = true;

      this.customerService.createCustomer(customer)
        .subscribe((result) => {
          if (`Result: ${result.status == 200}`) {
            this.isValid = true;
            this.isUsername = true;
            this.isCustomerName = true;
          }
        }, (error) => {
          this.isValid = false;
          if (error.error.internalErrorCode == 609) {
            this.isUsername = false;
          }
          if (error.error.internalErrorCode == 606) {
            this.isCustomerName = false;
          }
        })
    } else {
      this.isPassword = false;
    }
  }

}
