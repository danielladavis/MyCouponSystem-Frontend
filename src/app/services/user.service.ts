import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "http://localhost:8080/users";
  sendUser = new Subject<User>();

  constructor(private httpClient: HttpClient, private loginService: LoginService,
    private router: Router) { }


  // Post methods
  createUser(user: User) {
    return this.httpClient
      .post(`${this.url}`, user, { observe: 'response' })
  }

  createEmployee(user: User, companyID: number) {
    return this.httpClient
      .post(`${this.url}/${companyID}`, user, { observe: 'response' })
  }


  // Delete methods
  removeUser(userID: number) {
    return this.httpClient
      .delete(`${this.url}/${userID}`, { observe: 'response' })
  }


  // Get methods
  logout() {
    return this.httpClient
      .get(`${this.url}/logout`, { observe: 'response' })
      .subscribe((result) => {
        this.loginService.loggedInUser = null;
        this.loginService.isUserLegitimate = false;
        this.router.navigate([''])
      }, (error) => {

      }, () => {

      })
  }

  getUserById(userID: number) {
    return this.httpClient
      .get<User>(`${this.url}/${userID}`, { observe: 'response' })
  }

  getUserByName(username: string): Observable<User> {
    return this.httpClient
      .get<User>(`${this.url}/byName/?username=${username}`, { responseType: 'json' })
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(`${this.url}`, { responseType: 'json' })
  }

  getAllCompanyEmployees(companyID: number): Observable<User[]> {
    return this.httpClient
      .get<User[]>(`${this.url}/byCompany/?companyID=${companyID}`, { responseType: 'json' })
  }

  getCompanyEmployee(companyID: number, employeeName: string): Observable<User> {
    return this.httpClient
      .get<User>(`${this.url}/byEmployeeName/?companyID=${companyID}&employeeName=${employeeName}`, { responseType: 'json' })
  }

}
