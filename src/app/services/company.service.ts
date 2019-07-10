import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from 'src/app/models/company';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  url: string = "http://localhost:8080/companies";
  sendCompany = new Subject<Company>();

  constructor(private httpClient: HttpClient) { }

  // Post methods
  createCompany(company: Company) {
    return this.httpClient
      .post(`${this.url}`, company, { observe: 'response' })
  }


  // Delete methods
  removeCompany(companyID: number) {
    return this.httpClient
      .delete(`${this.url}/${companyID}`, { observe: 'response' })
  }


  // Get methods
  getCompanyById(companyID: number) {
    return this.httpClient
      .get<Company>(`${this.url}/${companyID}`, { observe: 'response' })
  }

  getCompanyByName(companyName: string): Observable<Company> {
    return this.httpClient
      .get<Company>(`${this.url}/byName/?companyName=${companyName}`, { responseType: 'json' })
  }

  getAllCompanies(): Observable<Company[]> {
    return this.httpClient
      .get<Company[]>(`${this.url}`, { responseType: 'json' })
  }

}
