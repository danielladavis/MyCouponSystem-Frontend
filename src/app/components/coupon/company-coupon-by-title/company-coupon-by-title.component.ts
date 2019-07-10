import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { Subscription } from 'rxjs';
import { CouponService } from 'src/app/services/coupon.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { NgForm } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { UserType } from 'src/app/enum/user-type.enum';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-company-coupon-by-title',
  templateUrl: './company-coupon-by-title.component.html',
  styleUrls: ['./company-coupon-by-title.component.css']
})
export class CompanyCouponByTitleComponent implements OnInit {

  coupon: Coupon = new Coupon;
  selectedCompany: Company = new Company();
  selectedCoupon: Coupon = new Coupon;
  minDate: Date = new Date(Date.now());
  subPurchasedAmount: Subscription;
  subUpdatedCoupon: Subscription;
  isCouponExsist: boolean = false;
  isAdmin: boolean = false;
  showUpdateCouponModal: boolean = false;
  showCompanyInfoModal: boolean = false;
  showPurchaseCouponModal: boolean = false;

  constructor(private userService: UserService, private loginService: LoginService, private couponService: CouponService,
    private purchaseService: PurchaseService) { }

  ngOnInit() {
    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 0) {
      this.isAdmin = true;
    }

    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 1) {
      this.userService.getUserByName(this.loginService.loggedInUser.userName).subscribe(
        (result) => {
          this.selectedCompany = result.company;
        }, (error) => {
          alert(`Error: ${error.error.errorMessage}`)
        })
    }
  }

  getCompanyCouponByTitle(form: NgForm) {
    this.isCouponExsist = false;

    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 0) {
      this.selectedCompany.companyID = form.value.companyID
    }

    this.couponService.getCompanyCouponByTitle(this.selectedCompany.companyID, form.value.couponTitle).subscribe(
      (result) => {
        this.coupon = result;
        if (this.coupon == null) {
          alert("Error: Coupon does not exsist!")
        } else {
          this.isCouponExsist = true;
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

  openCompanyInfo() {
    this.showCompanyInfoModal = !this.showCompanyInfoModal;
  }

  removeCoupon(coupon: Coupon) {
    this.couponService.removeCoupon(coupon.couponID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.isCouponExsist = false;
          alert("Coupon was removed successfuly!")
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

  updateCoupon() {
    this.selectedCoupon = Object.assign({}, this.coupon);
    this.showUpdateCouponModal = !this.showUpdateCouponModal;

    this.subUpdatedCoupon = this.couponService.sendUpdatedCouopon
      .subscribe(updatedCoupon => {
        this.coupon = Object.assign({}, updatedCoupon);
        this.subUpdatedCoupon.unsubscribe();
      })
  }

  purchesModal() {
    this.selectedCoupon = Object.assign({}, this.coupon);
    this.showPurchaseCouponModal = !this.showPurchaseCouponModal;

    this.subPurchasedAmount = this.purchaseService.sendCouoponPurchasedAmount
      .subscribe(purchasedAmount => {
        this.coupon.unitsInStock -= purchasedAmount;
        this.subPurchasedAmount.unsubscribe();
      })
  }

}
