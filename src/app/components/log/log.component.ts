import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { bounceInDown } from 'ng-animate';



@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)'}),
        animate('800ms ease-in',  style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('800ms ease-in', 
        style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class LogComponent implements OnInit {

  loginRegisterIsShown: boolean = false;
  toggleLoginRegisterView: boolean = true;

  constructor() { }

  ngOnInit() {
  }


  toggleHidden() {
    this.loginRegisterIsShown = !this.loginRegisterIsShown;
  }

  toggleLoginRegister() {
    this.toggleLoginRegisterView = !this.toggleLoginRegisterView;
  }

}
