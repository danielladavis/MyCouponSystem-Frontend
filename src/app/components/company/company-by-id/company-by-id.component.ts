import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-by-id',
  templateUrl: './company-by-id.component.html',
  styleUrls: ['./company-by-id.component.css']
})
export class CompanyByIDComponent implements OnInit {

  company: Company = new Company();
  isCompanyExsist: boolean = false;
  isValid: boolean = undefined;
  isRemoved: boolean = undefined;
  isCompanyID: boolean = undefined;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
  }

  getCompanyById(form: NgForm) {
    this.isCompanyExsist = false;
    this.isRemoved = undefined;
    this.isCompanyID = undefined;
    this.isValid = undefined;

    this.companyService.getCompanyById(form.value.companyID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.company = result.body;
          this.isCompanyID = true;
          this.isValid = true;
          this.isCompanyExsist = true;
        }
      }, (error) => {
        this.isCompanyExsist = false;
        this.isCompanyID = false;
        this.isValid = false;
      })
  }

  removeCompany(company: Company) {
    this.companyService.removeCompany(company.companyID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.isCompanyExsist = false;
          this.isRemoved = true;
        }
      }, (error) => {
        this.isRemoved = false;
      })
  }

}
