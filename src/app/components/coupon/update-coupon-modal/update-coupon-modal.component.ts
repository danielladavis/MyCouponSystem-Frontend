import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CouponService } from 'src/app/services/coupon.service';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig());
}

@Component({
  selector: 'app-update-coupon-modal',
  templateUrl: './update-coupon-modal.component.html',
  styleUrls: ['./update-coupon-modal.component.css']
})
export class UpdateCouponModalComponent implements OnInit {

  @Input() coupon: Coupon = new Coupon();
  @Output() closeModalEmmiter = new EventEmitter();
  dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  categoryType: string;
  dates = [];

  constructor(private couponService: CouponService) {
    this.dpConfig.containerClass = 'theme-default';
    this.dpConfig.rangeInputFormat = 'YYYY/MM/DD';
  }

  ngOnInit() {
    this.dates.push(this.coupon.startDate);
    this.dates.push(this.coupon.endDate);
  }

  closeModal() {
    this.closeModalEmmiter.emit();
  }

  updateCoupon(form: NgForm) {

    let dates: Date[] = form.value.startEndDate;

    let updatedCoupon: Coupon = {
      couponTitle: this.coupon.couponTitle,
      startDate: dates[0],
      endDate: dates[1],
      unitsInStock: form.value.unitsInStock,
      categoryType: form.value.categoryType,
      couponMessage: form.value.couponMessage,
      couponPrice: form.value.couponPrice,
      image: form.value.couponImage,
      company: this.coupon.company
    }

    this.couponService.updateCoupon(updatedCoupon).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          alert("Coupon was updated successfuly!")
          this.couponService.sendUpdatedCouopon.next(updatedCoupon);
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      }, () => {
        this.closeModal();
      })
  }

}

