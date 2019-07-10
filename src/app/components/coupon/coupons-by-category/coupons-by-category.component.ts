import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CouponService } from 'src/app/services/coupon.service';
import { Subscription } from 'rxjs';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-coupons-by-category',
  templateUrl: './coupons-by-category.component.html',
  styleUrls: ['./coupons-by-category.component.css']
})
export class CouponsByCategoryComponent implements OnInit {

  coupons: Coupon[] = [];
  selectedCompany: Company = new Company();
  selectedCoupon: Coupon = new Coupon();
  minDate: Date = new Date(Date.now());
  categoryType: any;
  subPurchasedAmount: Subscription;
  subUpdatedCoupon: Subscription;
  isCouponExsist: boolean = false;
  showUpdateCouponModal: boolean = false;
  showCompanyInfoModal: boolean = false;
  showPurchaseCouponModal: boolean = false;

  constructor(private couponService: CouponService,
    private purchaseService: PurchaseService) { }

  ngOnInit() {
  }

  onChange(selectedCategoryType: string) {
    this.categoryType = selectedCategoryType;
  }

  getCouponsByCategoryType() {
    this.isCouponExsist = false;

    this.couponService.getCouponsByCategoryType(this.categoryType).subscribe(
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

  openCompanyInfo(company: Company) {
    this.selectedCompany = company;
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

    this.subUpdatedCoupon = this.couponService.sendUpdatedCouopon
      .subscribe(updatedCoupon => {
        if (this.categoryType != updatedCoupon.categoryType) {
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
