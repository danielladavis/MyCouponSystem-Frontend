import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent implements OnInit {

  private customers: Customer[] = []

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(
      (result) => {
        this.customers = result;
        if (this.customers.length <= 0) {
          alert("No customers found")
        }
      },
      (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }


  removeCustomer(tempCustomer: Customer) {
    this.customerService.removeCustomer(tempCustomer.user.userID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {

          this.customers.filter((customer, index) => {
            if (customer.user.userID == tempCustomer.user.userID) {
              this.customers.splice(index, 1);
            }
          })
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

}
