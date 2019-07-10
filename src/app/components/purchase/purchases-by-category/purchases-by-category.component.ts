import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/models/purchase';
import { PurchaseService } from 'src/app/services/purchase.service';
import { NgForm } from '@angular/forms';
import { Coupon } from 'src/app/models/coupon';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-purchases-by-category',
  templateUrl: './purchases-by-category.component.html',
  styleUrls: ['./purchases-by-category.component.css']
})
export class PurchasesByCategoryComponent implements OnInit {

  purchases: Purchase[] = [];
  selectedUser: User = new User();
  selectedCoupon: Coupon = new Coupon();
  categoryType: any;
  isPurchaseExsist: boolean = false;
  showUserInfoModal: boolean = false;
  showCouponInfoModal: boolean = false;

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
  }

  onChange(selectedCategoryType: string) {
    this.categoryType = selectedCategoryType;
  }

  getByCategoryType(form: NgForm) {
    this.isPurchaseExsist = false;

    this.purchaseService.getByCategoryType(this.categoryType)
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
