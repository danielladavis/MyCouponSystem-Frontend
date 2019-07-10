import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/company';
import { NgForm } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  isValid: boolean = undefined;
  isEmail: boolean = undefined;
  isCompanyName: boolean = undefined;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
  }

  createCompany(form: NgForm) {
    this.isValid = undefined;
    this.isEmail = undefined;
    this.isCompanyName = undefined;

    if (form.value.companyEmail.includes('@') == true) {
      this.isEmail = true;

      let company: Company = {
        companyName: form.value.companyName,
        companyEmail: form.value.companyEmail
      }

      this.companyService.createCompany(company)
        .subscribe((result) => {
          if (`Result: ${result.status == 200}`) {
            this.isValid = true;
            this.isCompanyName = true;
          }
        }, (error) => {
          this.isValid = false;
          this.isCompanyName = false;
          this.isEmail = false;
        })
    } else {
      this.isEmail = false;
      this.isValid = false;
    }


  }

}
