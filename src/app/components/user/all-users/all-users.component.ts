import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Company } from 'src/app/models/company';
import { CustomerService } from 'src/app/services/customer.service';
import { UserType } from 'src/app/enum/user-type.enum';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users: User[] = [];
  selectedCompany: Company = new Company();
  showCompanyInfoModal: boolean = false;

  constructor(private userService: UserService, private customerService: CustomerService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (result) => {
        this.users = result;
        if (this.users.length <= 0) {
          alert("No users found")
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

  removeUser(user: User, index: number) {
    if (user.userClientType.toString() == UserType[UserType.CUSTOMER]) {
      this.customerService.removeCustomer(user.userID).subscribe(
        (result) => {
          if (`Result: ${result.status == 200}`) {
            this.users.splice(index, 1);
          }
        }, (error) => {
          alert(`Error: ${error.error.errorMessage}`)
        })
    } else {
      this.userService.removeUser(user.userID).subscribe(
        (result) => {
          if (`Result: ${result.status == 200}`) {
            this.users.splice(index, 1);
          }
        }, (error) => {
          alert(`Error: ${error.error.errorMessage}`)
        })
    }
  }

}
