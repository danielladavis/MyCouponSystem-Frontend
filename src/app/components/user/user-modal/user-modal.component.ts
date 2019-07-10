import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  @Input() user: User = new User();
  @Output() closeModalEmmiter = new EventEmitter();


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.sendUser.next(this.user)
  }

  closeModal() {
    this.closeModalEmmiter.emit();
  }

}
