import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, AfterContentChecked, DoCheck } from '@angular/core';
import { UserType } from 'src/app/enum/user-type.enum';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Purchase } from 'src/app/models/purchase';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Coupon } from 'src/app/models/coupon';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.css']
})
export class PurchaseModalComponent implements OnInit, DoCheck {

  @Input() coupon: Coupon;
  @Output() closeModalEmmiter = new EventEmitter();
  @ViewChild('purchaseForm') purchaseForm: NgForm;
  user: User = new User();
  isAdminOrCompany: boolean = false;
  alreadySetValue: boolean = false;
  unitInStock: number = 0;

  constructor(private userService: UserService, private loginService: LoginService, private purchaseService: PurchaseService) { }

  ngOnInit() {
    this.unitInStock = this.coupon.unitsInStock;

    if (Number(UserType[this.loginService.loggedInUser.clientType]) != 2) {
      this.isAdminOrCompany = true;
    }
  }

  ngDoCheck(): void {
    if (this.purchaseForm.controls && this.purchaseForm.controls.amount && !this.alreadySetValue) {
      this.alreadySetValue = true;
      this.purchaseForm.controls.amount.setValue(this.unitInStock)
    }
  }

  closeModal() {
    this.closeModalEmmiter.emit();
  }

  purchaseCoupon(form: NgForm) {

    let userID;

    switch (Number(UserType[this.loginService.loggedInUser.clientType])) {
      case 0: userID = form.value.userID;
        break;
      case 1:
        this.userService.getUserByName(this.loginService.loggedInUser.userName).subscribe(
          (result) => {
            this.user = result;
            if (this.user == null) {
              alert("Error: User does not exsist!")
            } else {
              userID = this.user.userID
            }
          }, (error) => {
            alert(`Error: ${error.error.errorMessage}`)
          }
        )
        break;
    }

    let purchase: Purchase = {
      purchaseAmount: form.value.amount
    }

    this.purchaseService.purchaseCoupon(purchase, userID, this.coupon.couponID)
      .subscribe((result) => {
        if (`Result: ${result.status == 200}`) {
          this.purchaseService.sendCouoponPurchasedAmount.next(form.value.amount);
          alert("Purchase was created successfuly!")
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      }, () => {
        this.closeModal();
      })
  }

}
