import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url: string = "http://localhost:8080/customers";

  constructor(private httpClient: HttpClient) {
  }

  // Post methods
  createCustomer(customer: Customer) {
    return this.httpClient
      .post(`${this.url}`, customer, { observe: 'response' })
  }


  // Delete methods
  removeCustomer(customerID: number) {
    return this.httpClient
      .delete(`${this.url}/${customerID}`, { observe: 'response' })
  }


  // Get methods
  getCustomerById(customerID: number) {
    return this.httpClient
      .get<Customer>(`${this.url}/${customerID}`, { observe: 'response' })
  }

  getCustomerByName(customerName: string): Observable<Customer> {
    return this.httpClient
      .get<Customer>(`${this.url}/byName/?customerName=${customerName}`, { responseType: 'json' })
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.httpClient
      .get<Customer[]>(`${this.url}`, { responseType: 'json' })
  }

  getCompanyCustomer(companyID: number, customerName: string): Observable<Customer> {
    return this.httpClient
      .get<Customer>(`${this.url}/byCompanyCustomer/?companyID=${companyID}&customerName=${customerName}`, { responseType: 'json' })
  }

  getCompanyCustomers(companyID: number): Observable<Customer[]> {
    return this.httpClient
      .get<Customer[]>(`${this.url}/byCompany/?companyID=${companyID}`, { responseType: 'json' })
  }

}
