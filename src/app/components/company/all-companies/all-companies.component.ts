import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.css']
})
export class AllCompaniesComponent implements OnInit {

  private companies: Company[] = []
  isExsist: boolean = undefined;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.getAllCompanies().subscribe(
      (result) => {
        this.companies = result;
        if (this.companies.length <= 0) {
          this.isExsist = false;
        } else{
          this.isExsist = true;
        }
      },
      (error) => {
        this.isExsist = false;
      })
  }

  removeCompany(tempCompany: Company) {
    this.companyService.removeCompany(tempCompany.companyID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.companies.filter((company, index) => {
            if (company.companyID == tempCompany.companyID) {
              this.companies.splice(index, 1);
            }
          })
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

}
