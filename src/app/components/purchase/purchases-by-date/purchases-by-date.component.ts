import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/models/purchase';
import { PurchaseService } from 'src/app/services/purchase.service';
import { NgForm } from '@angular/forms';
import { Coupon } from 'src/app/models/coupon';
import { User } from 'src/app/models/user';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig());
}

@Component({
  selector: 'app-purchases-by-date',
  templateUrl: './purchases-by-date.component.html',
  styleUrls: ['./purchases-by-date.component.css']
})
export class PurchasesByDateComponent implements OnInit {

  dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  purchases: Purchase[] = [];
  selectedUser: User = new User();
  selectedCoupon: Coupon = new Coupon();
  minDate = new Date(Date.now());
  isPurchaseExsist: boolean = false;
  showUserInfoModal: boolean = false;
  showCouponInfoModal: boolean = false;

  constructor(private purchaseService: PurchaseService) {
    this.dpConfig.containerClass = 'theme-default';
    this.dpConfig.dateInputFormat = 'YYYY/MM/DD';
  }

  ngOnInit() {
  }

  getUpToCertainDate(form: NgForm) {
    this.isPurchaseExsist = false;

    this.purchaseService.getUpToCertainDate(form.value.endDate)
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

  removePurchase(tempPurchase: Purchase) {
    this.purchaseService.removePurchase(tempPurchase.purchaseID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.purchases.filter((purchase, index) => {
            if (purchase.purchaseID == tempPurchase.purchaseID) {
              this.purchases.splice(index, 1);
            }
          })
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

}

