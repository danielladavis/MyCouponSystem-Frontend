import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/models/purchase';
import { PurchaseService } from 'src/app/services/purchase.service';
import { NgForm } from '@angular/forms';
import { Coupon } from 'src/app/models/coupon';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/enum/user-type.enum';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer-purchases',
  templateUrl: './customer-purchases.component.html',
  styleUrls: ['./customer-purchases.component.css']
})
export class CustomerPurchasesComponent implements OnInit {

  purchases: Purchase[] = [];
  selectedUser: User = new User();
  selectedCoupon: Coupon = new Coupon();
  isPurchaseExsist: boolean = false;
  isAdmin: boolean = false;
  isCompany: boolean = false;
  showUserInfoModal: boolean = false;
  showCouponInfoModal: boolean = false;

  constructor(private purchaseService: PurchaseService, private userService: UserService, private loginService: LoginService) { }

  ngOnInit() {
    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 0) {
      this.isAdmin = true;
    }

    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 1) {
      this.isCompany = true;
    }

    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 2) {
      this.CustomerPurchasesByUsername(this.loginService.loggedInUser.userName);
    }
  }

  getCustomerPurchases(form: NgForm) {
    this.isPurchaseExsist = false;

    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 0) {
      this.selectedUser.userID = form.value.userID
      this.CustomerPurchases(this.selectedUser.userID);
    }

    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 1) {
      this.CustomerPurchasesByUsername(form.value.username);
    }
  }

  CustomerPurchasesByUsername(username: string) {
    this.userService.getUserByName(username).subscribe(
      (result) => {
        if (result == null) {
          alert("Error: User does not exsist!")
        } else {
          this.selectedUser = result
          this.CustomerPurchases(this.selectedUser.userID);
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

  CustomerPurchases(userID: number) {
    this.purchaseService.getCustomerPurchases(userID)
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

  removeCustomerPurchases() {
    this.purchaseService.removeCustomerPurchases(this.selectedUser.userID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.isPurchaseExsist = false;
          alert("Customer purchases were removed successfuly!");
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

}
