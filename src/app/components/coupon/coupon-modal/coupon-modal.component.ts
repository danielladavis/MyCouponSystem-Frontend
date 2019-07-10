import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { CouponService } from 'src/app/services/coupon.service';
import { Coupon } from 'src/app/models/coupon';

@Component({
  selector: 'app-coupon-modal',
  templateUrl: './coupon-modal.component.html',
  styleUrls: ['./coupon-modal.component.css']
})
export class CouponModalComponent implements OnInit {
  
  @Input() coupon: Coupon;
  @Output() closeModalEmmiter = new EventEmitter();


  constructor(private couponService: CouponService ) { }

  ngOnInit() {
    this.couponService.sendCoupon.next(this.coupon)
  }

  closeModal(){
    this.closeModalEmmiter.emit();
  }
           
}
