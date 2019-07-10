import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CouponService } from 'src/app/services/coupon.service';
import { Coupon } from 'src/app/models/coupon';
import { LoginService } from 'src/app/services/login.service';
import { UserType } from 'src/app/enum/user-type.enum';
import { CategoryType } from 'src/app/enum/category-type.enum';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { UserService } from 'src/app/services/user.service';
import { Company } from 'src/app/models/company';
import { ImageService } from 'src/app/services/image.service';
// import { Image } from 'src/app/models/image';

export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig());
}

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css']
})
export class CreateCouponComponent implements OnInit {

  dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  company: Company = new Company();
  minDate = new Date(Date.now());
  categoryType: string;
  isAdmin: boolean = false;
  isCompanyID: boolean = undefined;
  isCouponTitle: boolean = undefined;
  imageObj: File;
  image: any;

  constructor(private userService: UserService,
    private couponServise: CouponService,
    private loginService: LoginService,
    private imageService: ImageService) {
    this.dpConfig.containerClass = 'theme-default';
    this.dpConfig.rangeInputFormat = 'YYYY/MM/DD';
  }

  ngOnInit() {
    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 0) {
      this.isAdmin = true;
    }

    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 1) {
      this.userService.getUserByName(this.loginService.loggedInUser.userName).subscribe(
        (result) => {
          this.company = result.company;
        }, (error) => {
          alert(`Error: ${error.error.errorMessage}`)
        })
    }
  }

  getImage(image) {
    this.imageObj = <File>image.file;
    this.image = image.image;
    console.log(this.imageObj)
  }

  onChange(selectedCategoryType: string) {
    this.categoryType = selectedCategoryType;
  }

  createCoupon(form: NgForm) {
    if (Number(UserType[this.loginService.loggedInUser.clientType]) == 0) {
      this.company.companyID = form.value.companyID
    }

    this.imageService.uploadImage(this.imageObj)
      .subscribe((result) => {
        if (`Result: ${result.status == 200}`) {
          
          let dates: Date[] = form.value.startEndDate;

          let coupon: Coupon = {
            couponTitle: form.value.couponTitle,
            startDate: dates[0],
            endDate: dates[1],
            unitsInStock: form.value.unitsInStock,
            categoryType: CategoryType[this.categoryType],
            couponMessage: form.value.couponMessage,
            couponPrice: form.value.couponPrice,
            // couponImage: this.imageObj
          }

          this.couponServise.createCoupon(coupon, this.company.companyID, parseInt(result.body.toString()))
            .subscribe((result) => {
              if (`Result: ${result.status == 200}`) {
                alert("Coupon was created successfuly!")
              }
            }, (error) => {
              alert(`Error: ${error.error.errorMessage}`)
            })
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

}
