import { Component, OnInit } from '@angular/core';
import { IncomeDescription } from 'src/app/enum/income-description.enum';
import { Income } from 'src/app/models/income';
import { IncomeService } from 'src/app/services/income.service';
import { Company } from 'src/app/models/company';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-incomes-by-description',
  templateUrl: './incomes-by-description.component.html',
  styleUrls: ['./incomes-by-description.component.css']
})
export class IncomesByDescriptionComponent implements OnInit {

  incomes: Income[] = [];
  selectedCompany: Company = new Company();
  isIncomeExsist: boolean = false;
  showCompanyInfoModal: boolean = false;
  incomeDescription = IncomeDescription;
  description: string;

  constructor(private incomeService: IncomeService) { }

  ngOnInit() {
  }

  onChange(selectedDescription: string) {
    this.description = selectedDescription;
  }

  openCompanyInfo(company: Company) {
    this.selectedCompany = company;
    this.showCompanyInfoModal = !this.showCompanyInfoModal;
  }

  getIncomesByDescription(form: NgForm) {
    this.isIncomeExsist = false;

    this.description = form.value.incomeDescription

    this.incomeService.getIncomesByDescription(this.description).subscribe(
      (result) => {
        this.incomes = result;
        if (this.incomes.length <= 0) {
          this.isIncomeExsist = false;
          alert("Error: No incomes found");
        } else {
          this.isIncomeExsist = true;
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
