import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from 'src/app/models/coupon';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  url: string = "http://localhost:8080/coupons";
  sendCoupon = new Subject<Coupon>();
  sendUpdatedCouopon = new Subject<Coupon>();

  constructor(private httpClient: HttpClient) { }

  // Post methods
  createCoupon(coupon: Coupon, companyID: number , imageID: number) {
    return this.httpClient
      .post(`${this.url}/${companyID}/${imageID}`, coupon, { observe: 'response' })
  }


  // Delete methods
  removeCoupon(couponID: number) {
    return this.httpClient
      .delete(`${this.url}/${couponID}`, { observe: 'response' })
  }

  removeCompanyCoupons(companyID: number) {
    return this.httpClient
      .delete(`${this.url}/byCompany/${companyID}`, { observe: 'response' })
  }


  // Put methods
  updateCoupon(coupon: Coupon) {
    return this.httpClient
      .put(`${this.url}`, coupon, { observe: 'response' })
  }


  // Get methods
  getCouponById(couponID: number) {
    return this.httpClient
      .get<Coupon>(`${this.url}/${couponID}`, { observe: 'response' })
      .pipe(
        map(coupon => {
          coupon.body.startDate = new Date(coupon.body.startDate)
          coupon.body.endDate = new Date(coupon.body.endDate)
          return coupon;
        }))
  }

  getCouponByTitle(couponTitle: string): Observable<Coupon> {
    return this.httpClient
      .get<Coupon>(`${this.url}/byTitle/?couponTitle=${couponTitle}`, { responseType: 'json' })
      .pipe(
        map(coupon => {
          coupon.startDate = new Date(coupon.startDate)
          coupon.endDate = new Date(coupon.endDate)
          return coupon;
        }))
  }

  getCompanyCouponByTitle(companyID: number, couponTitle: string): Observable<Coupon> {
    return this.httpClient
      .get<Coupon>(`${this.url}/byCompanyTitle/?companyID=${companyID}&couponTitle=${couponTitle}`, { responseType: 'json' })
      .pipe(
        map(coupon => {
          coupon.startDate = new Date(coupon.startDate)
          coupon.endDate = new Date(coupon.endDate)
          return coupon;
        }))
  }

  getAllCoupons(): Observable<Coupon[]> {
    return this.httpClient
      .get<Coupon[]>(`${this.url}`, { responseType: 'json' })
      .pipe(
        map(coupons => {
          coupons.map(coupon => {
            coupon.startDate = new Date(coupon.startDate)
            coupon.endDate = new Date(coupon.endDate)
          })
          return coupons;
        }))
  }

  getCouponsByCategoryType(categoryType: string): Observable<Coupon[]> {
    return this.httpClient
      .get<Coupon[]>(`${this.url}/byCategory/?categoryType=${categoryType}`, { responseType: 'json' })
      .pipe(
        map(coupons => {
          coupons.map(coupon => {
            coupon.startDate = new Date(coupon.startDate)
            coupon.endDate = new Date(coupon.endDate)
          })
          return coupons;
        }))
  }

  getCouponsByMaxPrice(couponPrice: number): Observable<Coupon[]> {
    return this.httpClient
      .get<Coupon[]>(`${this.url}/byMaxPrice/?couponPrice=${couponPrice}`, { responseType: 'json' })
      .pipe(
        map(coupons => {
          coupons.map(coupon => {
            coupon.startDate = new Date(coupon.startDate)
            coupon.endDate = new Date(coupon.endDate)
          })
          return coupons;
        }))
  }

  getCouponsUpToCertainDate(endDate: Date): Observable<Coupon[]> {
    let date = new Date(endDate.toISOString());
    let formatedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    return this.httpClient
      .get<Coupon[]>(`${this.url}/byDate/?endDate=${formatedDate}`, { responseType: 'json' })
      .pipe(
        map(coupons => {
          coupons.map(coupon => {
            coupon.startDate = new Date(coupon.startDate)
            coupon.endDate = new Date(coupon.endDate)
          })
          return coupons;
        }))
  }

  getCompanyCoupons(companyID: number): Observable<Coupon[]> {
    return this.httpClient
      .get<Coupon[]>(`${this.url}/byCompany/?companyID=${companyID}`, { responseType: 'json' })
      .pipe(
        map(coupons => {
          coupons.map(coupon => {
            coupon.startDate = new Date(coupon.startDate)
            coupon.endDate = new Date(coupon.endDate)
          })
          return coupons;
        }))
  }

  getCompanyCouponsByCategoryType(companyID: number, categoryType: string): Observable<Coupon[]> {
    return this.httpClient
      .get<Coupon[]>(`${this.url}/byCompanyCategory/?companyID=${companyID}&categoryType=${categoryType}`, { responseType: 'json' })
      .pipe(
        map(coupons => {
          coupons.map(coupon => {
            coupon.startDate = new Date(coupon.startDate)
            coupon.endDate = new Date(coupon.endDate)
          })
          return coupons;
        }))
  }

  getCompanyCouponsByMaxPrice(companyID: number, couponPrice: number): Observable<Coupon[]> {
    return this.httpClient
      .get<Coupon[]>(`${this.url}/byCompanyMaxPrice/?companyID=${companyID}&couponPrice=${couponPrice}`, { responseType: 'json' })
      .pipe(
        map(coupons => {
          coupons.map(coupon => {
            coupon.startDate = new Date(coupon.startDate)
            coupon.endDate = new Date(coupon.endDate)
          })
          return coupons;
        }))
  }

  getCompanyCouponsUpToCertainDate(companyID: number, endDate: Date): Observable<Coupon[]> {
    let date = new Date(endDate.toISOString());
    let formatedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    return this.httpClient
      .get<Coupon[]>(`${this.url}/byCompanyDate/?companyID=${companyID}&endDate=${formatedDate}`, { responseType: 'json' })
      .pipe(
        map(coupons => {
          coupons.map(coupon => {
            coupon.startDate = new Date(coupon.startDate)
            coupon.endDate = new Date(coupon.endDate)
          })
          return coupons;
        }))
  }

}
