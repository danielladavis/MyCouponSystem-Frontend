import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Coupon } from 'src/app/models/coupon';
import { CouponService } from 'src/app/services/coupon.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Company } from 'src/app/models/company';

export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig());
}

@Component({
  selector: 'app-coupons-by-date',
  templateUrl: './coupons-by-date.component.html',
  styleUrls: ['./coupons-by-date.component.css']
})
export class CouponsByDateComponent implements OnInit {

  dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  coupons: Coupon[] = [];
  selectedCompany: Company = new Company();
  selectedCoupon: Coupon = new Coupon();
  minDate: Date = new Date(Date.now());
  endDate: Date;
  subPurchasedAmount: Subscription;
  subUpdatedCoupon: Subscription;
  isCouponExsist: boolean = false;
  showUpdateCouponModal: boolean = false;
  showCompanyInfoModal: boolean = false;
  showPurchaseCouponModal: boolean = false;

  constructor(private couponService: CouponService,
    private purchaseService: PurchaseService) {
    this.dpConfig.containerClass = 'theme-default';
    this.dpConfig.dateInputFormat = 'YYYY/MM/DD';
  }

  ngOnInit() {
  }

  openCompanyInfo(company: Company) {
    this.selectedCompany = company;
    this.showCompanyInfoModal = !this.showCompanyInfoModal;
  }

  getCouponsUpToCertainDate(form: NgForm) {
    this.isCouponExsist = false;

    this.endDate = form.value.endDate;

    this.couponService.getCouponsUpToCertainDate(this.endDate).subscribe(
      (result) => {
        this.coupons = result;
        if (this.coupons.length <= 0) {
          this.isCouponExsist = false;
          alert("Error: No coupons found");
        } else {
          this.isCouponExsist = true;
        }
      },
      (error) => {
        alert(`Error: ${error.error.errorMessage}`);
      })
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
