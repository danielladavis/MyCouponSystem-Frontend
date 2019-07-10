import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/enum/user-type.enum';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  createUser(form: NgForm) {

    let user: User = {
      userClientType: UserType.ADMIN,
      userPassword: form.value.password,
      username: form.value.username
    }

    this.userService.createUser(user)
      .subscribe((result) => {
        if (`Result: ${result.status == 200}`) {
          alert("User was created successfuly!")
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

}
