import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/enum/user-type.enum';

@Component({
  selector: 'app-create-company-employee',
  templateUrl: './create-company-employee.component.html',
  styleUrls: ['./create-company-employee.component.css']
})
export class CreateCompanyEmployeeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  createUser(form: NgForm) {

    let user: User = {
      userClientType: UserType.COMPANY,
      userPassword: form.value.password,
      username: form.value.username
    }

    this.userService.createEmployee(user, form.value.companyID)
      .subscribe((result) => {
        if (`Result: ${result.status == 200}`) {
          alert("User was created successfuly!")
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

}
