import { Component, OnInit } from '@angular/core';
import { Income } from 'src/app/models/income';
import { IncomeDescription } from 'src/app/enum/income-description.enum';
import { IncomeService } from 'src/app/services/income.service';
import { Company } from 'src/app/models/company';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-income-by-company',
  templateUrl: './income-by-company.component.html',
  styleUrls: ['./income-by-company.component.css']
})
export class IncomeByCompanyComponent implements OnInit {

  incomes: Income[] = [];
  selectedCompany: Company = new Company();
  isIncomeExsist: boolean = false;
  showCompanyInfoModal: boolean = false;
  incomeDescription = IncomeDescription;

  constructor(private incomeService: IncomeService) { }

  ngOnInit() {
  }

  openCompanyInfo() {
    this.showCompanyInfoModal = !this.showCompanyInfoModal;
  }

  getIncomesByCompany(form: NgForm) {
    this.isIncomeExsist = false;

    this.incomeService.getIncomesByCompany(form.value.companyID).subscribe(
      (result) => {
        this.incomes = result;
        if (this.incomes.length <= 0) {
          this.isIncomeExsist = false;
          alert("Error: No incomes found");
        } else {
          this.isIncomeExsist = true;
          this.selectedCompany = this.incomes[0].company;
        }
      },
      (error) => {
        this.isIncomeExsist = false;
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

  removeIncome(income: Income) {
    this.incomeService.removeIncome(income.incomeID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.isIncomeExsist = false;
          alert("Income was removed successfuly!")
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }

}
