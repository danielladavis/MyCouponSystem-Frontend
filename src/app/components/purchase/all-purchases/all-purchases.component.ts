import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { Purchase } from 'src/app/models/purchase';
import { User } from 'src/app/models/user';
import { PurchaseService } from 'src/app/services/purchase.service';


@Component({
  selector: 'app-all-purchases',
  templateUrl: './all-purchases.component.html',
  styleUrls: ['./all-purchases.component.css']
})
export class AllPurchasesComponent implements OnInit {

  purchases: Purchase[] = [];
  selectedUser: User = new User();
  selectedCoupon: Coupon = new Coupon();
  showUserInfoModal: boolean = false;
  showCouponInfoModal: boolean = false;

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
    this.purchaseService.getAllPurchase()
      .subscribe(
        (result) => {
          this.purchases = result;
          if (this.purchases.length <= 0) {
            alert("Error: No purchases found");
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
