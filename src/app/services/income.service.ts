import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Income } from '../models/income';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  url: string = "http://localhost:8080/incomes";

  constructor(private httpClient: HttpClient) {
  }


  // Delete methods
  removeIncome(incomeID: number) {
    return this.httpClient
      .delete(`${this.url}/${incomeID}`, { observe: 'response' })
  }


  // Get methods
  getIncomeById(incomeID: number) {
    return this.httpClient
      .get<Income>(`${this.url}/${incomeID}`, { observe: 'response' })
  }

  getIncomesByDescription(incomeDescription: string): Observable<Income[]> {
    return this.httpClient
      .get<Income[]>(`${this.url}/byDescription/?incomeDescription=${incomeDescription}`, { responseType: 'json' })
  }

  getIncomesByCompany(companyID: number): Observable<Income[]> {
    return this.httpClient
      .get<Income[]>(`${this.url}/byCompany/?companyID=${companyID}`, { responseType: 'json' })
  }

  getAllIncomes(): Observable<Income[]> {
    return this.httpClient
      .get<Income[]>(`${this.url}`, { responseType: 'json' })
  }

}
