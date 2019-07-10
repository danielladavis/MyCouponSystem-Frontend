import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CouponService } from 'src/app/services/coupon.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-coupon-by-id',
  templateUrl: './coupon-by-id.component.html',
  styleUrls: ['./coupon-by-id.component.css']
})
export class CouponByIDComponent implements OnInit {

  coupon: Coupon = new Coupon;
  selectedCoupon: Coupon = new Coupon();
  minDate: Date = new Date(Date.now());
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

  getCouponById(form: NgForm) {
    this.isCouponExsist = false;

    this.couponService.getCouponById(form.value.couponID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.coupon = result.body;
          
          console.log(this.coupon.image.image);
          this.isCouponExsist = true;
        }
      }, (error) => {
        this.isCouponExsist = false;
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
