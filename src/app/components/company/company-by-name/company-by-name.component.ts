import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { NgForm } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-by-name',
  templateUrl: './company-by-name.component.html',
  styleUrls: ['./company-by-name.component.css']
})
export class CompanyByNameComponent implements OnInit {

  company: Company = new Company();
  isCompanyExsist: boolean = false;
  isValid: boolean = undefined;
  isRemoved: boolean = undefined;
  isCompanyName: boolean = undefined;

  constructor(private companyService: CompanyService) { }


  ngOnInit() {
  }

  getCompanyByName(form: NgForm) {
    this.isCompanyExsist = false;
    this.isRemoved = undefined;
    this.isCompanyName = undefined;
    this.isValid = undefined;

    this.companyService.getCompanyByName(form.value.companyName).subscribe(
      (result) => {
        this.company = result;
        if (this.company == null) {
          this.isCompanyName = false;
          this.isValid = false;
          this.isCompanyExsist = false;
        } else {
          this.isCompanyName = true;
          this.isValid = true;
          this.isCompanyExsist = true;
        }
      }, (error) => {
        this.isCompanyName = false;
        this.isValid = false;
        this.isCompanyExsist = false;
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
