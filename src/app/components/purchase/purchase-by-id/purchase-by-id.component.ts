import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/models/purchase';
import { PurchaseService } from 'src/app/services/purchase.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-purchase-by-id',
  templateUrl: './purchase-by-id.component.html',
  styleUrls: ['./purchase-by-id.component.css']
})
export class PurchaseByIDComponent implements OnInit {

  purchase: Purchase = new Purchase();
  isPurchaseExsist: boolean = false;
  showUserInfoModal: boolean = false;
  showCouponInfoModal: boolean = false;

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
  }

  getPurchaseById(form: NgForm) {
    this.isPurchaseExsist = false;

    this.purchaseService.getPurchaseById(form.value.purchaseID)
      .subscribe(
        (result) => {
          if (`Result: ${result.status == 200}`) {
            this.purchase = result.body;
            this.isPurchaseExsist = true;
          }
        }, (error) => {
          this.isPurchaseExsist = false;
          alert(`Error: ${error.error.errorMessage}`)
        })
  }

  openCouponInfo() {
    this.showCouponInfoModal = !this.showCouponInfoModal;
  }

  openUserInfo() {
    this.showUserInfoModal = !this.showUserInfoModal;
  }

  removePurchase(tempPurchase: Purchase) {
    this.purchaseService.removePurchase(tempPurchase.purchaseID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.isPurchaseExsist = false;
          alert("Purchase was removed successfuly!")
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

}
