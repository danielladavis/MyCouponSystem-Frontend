import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/models/purchase';
import { User } from 'src/app/models/user';
import { PurchaseService } from 'src/app/services/purchase.service';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { UserType } from 'src/app/enum/user-type.enum';
import { NgForm } from '@angular/forms';
import { Coupon } from 'src/app/models/coupon';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-company-purchases',
  templateUrl: './company-purchases.component.html',
  styleUrls: ['./company-purchases.component.css']
})
export class CompanyPurchasesComponent implements OnInit {

  purchases: Purchase[] = [];
  company: Company = new Company();
  selectedUser: User = new User();
  selectedCoupon: Coupon = new Coupon();
  isPurchaseExsist: boolean = false;
  isAdmin: boolean = false;
  showUserInfoModal: boolean = false;
  showCouponInfoModal: boolean = false;

  constructor(private userService: UserService, private purchaseService: PurchaseService, private loginService: LoginService) { }

  ngOnInit() {
    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 0) {
      this.isAdmin = true;
    }

    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 1) {
      this.userService.getUserByName(this.loginService.loggedInUser.userName).subscribe(
        (result) => {
          this.company = result.company;
          this.companyPurchases(this.company.companyID);
        }, (error) => {
          alert(`Error: ${error.error.errorMessage}`)
        })
    }
  }

  getCompanyPurchases(form: NgForm) {
    this.isPurchaseExsist = false;
    this.companyPurchases(form.value.companyID);
  }

  companyPurchases(companyID: number) {
    this.purchaseService.getCompanyPurchases(companyID)
      .subscribe(
        (result) => {
          this.purchases = result;
          if (this.purchases.length <= 0) {
            this.isPurchaseExsist = false;
            alert("Error: No purchases found");
          } else {
            this.isPurchaseExsist = true;
          }

        }, (error) => {
          alert(`Error: ${error.error.errorMessage}`)
        })
  }

  openCouponInfo(coupon: Coupon) {
    this.selectedCoupon = coupon;
    this.showCouponInfoModal = !this.showCouponInfoModal;
  }

  openUserInfo(user: User) {
    this.selectedUser = user;
    this.showUserInfoModal = !this.showUserInfoModal;

  }

  removePurchase(purchase: Purchase, index: number) {
    this.purchaseService.removePurchase(purchase.purchaseID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.purchases.splice(index, 1);
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

}
