import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Purchase } from '../models/purchase';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  url: string = "http://localhost:8080/purchases";
  sendCouoponPurchasedAmount = new Subject<number>();

  constructor(private httpClient: HttpClient) { }


  // Post methods
  purchaseCoupon(purchase: Purchase, userID: number, couponID: number) {
    return this.httpClient
      .post(`${this.url}/${userID}/${couponID}`, purchase, { observe: 'response' })
  }


  // Delete methods
  removePurchase(purchaseID: number) {
    return this.httpClient
      .delete(`${this.url}/${purchaseID}`, { observe: 'response' })
  }

  removeCustomerPurchases(userID: number) {
    return this.httpClient
      .delete(`${this.url}/byCustomer/?userID=${userID}`, { observe: 'response' })
  }


  // Get methods
  getPurchaseById(purchaseID: number) {
    return this.httpClient
      .get<Purchase>(`${this.url}/${purchaseID}`, { observe: 'response' })
  }

  getByCategoryType(categoryType: string): Observable<Purchase[]> {
    return this.httpClient
      .get<Purchase[]>(`${this.url}/byCategory/?categoryType=${categoryType}`, { responseType: 'json' })
  }

  getByMaxPrice(couponPrice: number): Observable<Purchase[]> {
    return this.httpClient
      .get<Purchase[]>(`${this.url}/byMaxPrice/?couponPrice=${couponPrice}`, { responseType: 'json' })
  }

  getUpToCertainDate(endDate: Date): Observable<Purchase[]> {
    let date = new Date(endDate.toISOString());
    let formatedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    return this.httpClient
      .get<Purchase[]>(`${this.url}/byDate/?endDate=${formatedDate}`, { responseType: 'json' })
  }

  getCustomerPurchases(userID: number): Observable<Purchase[]> {
    return this.httpClient
      .get<Purchase[]>(`${this.url}/customerPurchases/?userID=${userID}`, { responseType: 'json' })
  }

  getCompanyPurchases(companyID: number): Observable<Purchase[]> {
    return this.httpClient
      .get<Purchase[]>(`${this.url}/companyPurchases/?companyID=${companyID}`, { responseType: 'json' })
  }

  getCompanyCustomerPurchases(companyID: number, userID: number): Observable<Purchase[]> {
    return this.httpClient
      .get<Purchase[]>(`${this.url}/companyCustomerPurchases/?companyID=${companyID}&userID=${userID}`, { responseType: 'json' })
  }

  getAllPurchase(): Observable<Purchase[]> {
    return this.httpClient
      .get<Purchase[]>(`${this.url}`, { responseType: 'json' })
  }

}
