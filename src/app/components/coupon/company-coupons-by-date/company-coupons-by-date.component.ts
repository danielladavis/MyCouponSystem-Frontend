import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CouponService } from 'src/app/services/coupon.service';
import { LoginService } from 'src/app/services/login.service';
import { UserType } from 'src/app/enum/user-type.enum';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Subscription } from 'rxjs';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Company } from 'src/app/models/company';
import { UserService } from 'src/app/services/user.service';

export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig());
}

@Component({
  selector: 'app-company-coupons-by-date',
  templateUrl: './company-coupons-by-date.component.html',
  styleUrls: ['./company-coupons-by-date.component.css']
})
export class CompanyCouponsByDateComponent implements OnInit {

  coupons: Coupon[] = [];
  selectedCompany: Company = new Company();
  selectedCoupon: Coupon = new Coupon();
  dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  minDate: Date = new Date(Date.now());
  endDate: Date;
  subPurchasedAmount: Subscription;
  subUpdatedCoupon: Subscription;
  isAdmin: boolean = false;
  isCouponExsist: boolean = false;
  showUpdateCouponModal: boolean = false;
  showCompanyInfoModal: boolean = false;
  showPurchaseCouponModal: boolean = false;


  constructor(private userService: UserService, private couponService: CouponService, private loginService: LoginService,
    private purchaseService: PurchaseService) {
    this.dpConfig.containerClass = 'theme-default';
    this.dpConfig.dateInputFormat = 'YYYY/MM/DD';
  }

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

  getCompanyCouponsUpToCertainDate(form: NgForm) {
    this.isCouponExsist = false;

    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 0) {
      this.selectedCompany.companyID = form.value.companyID
    }

    this.endDate = form.value.endDate;

    this.couponService.getCompanyCouponsUpToCertainDate(this.selectedCompany.companyID, this.endDate).subscribe(
      (result) => {
        this.coupons = result;
        if (this.coupons.length <= 0) {
          this.isCouponExsist = false;
          alert("Error: No coupons found");
        } else {
          this.isCouponExsist = true;
          this.selectedCompany = result[0].company;
        }
      },
      (error) => {
        alert(`Error: ${error.error.errorMessage}`);
      })
  }

  openCompanyInfo() {
    this.showCompanyInfoModal = !this.showCompanyInfoModal;
  }

  removeCoupon(tempCoupon: Coupon) {
    this.couponService.removeCoupon(tempCoupon.couponID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.coupons.filter((coupon, index) => {
            if (coupon.couponID == tempCoupon.couponID) {
              this.coupons.splice(index, 1);
            }
          })
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

  updateCoupon(coupon: Coupon, index: number) {
    this.selectedCoupon = Object.assign({}, coupon);
    this.showUpdateCouponModal = !this.showUpdateCouponModal;

    let tempDateMili = this.endDate.getTime();

    this.subUpdatedCoupon = this.couponService.sendUpdatedCouopon
      .subscribe(updatedCoupon => {
        if (tempDateMili < updatedCoupon.endDate.getTime()) {
          this.coupons.splice(index, 1);
        } else {
          this.coupons[index] = Object.assign({}, updatedCoupon);
        }
        this.subUpdatedCoupon.unsubscribe();
      })
  }

  purchesModal(coupon: Coupon, index: number) {
    this.selectedCoupon = Object.assign({}, coupon);
    this.showPurchaseCouponModal = !this.showPurchaseCouponModal;

    this.subPurchasedAmount = this.purchaseService.sendCouoponPurchasedAmount
      .subscribe(purchasedAmount => {
        this.coupons[index].unitsInStock -= purchasedAmount;
        this.subPurchasedAmount.unsubscribe();
      })
  }

}

