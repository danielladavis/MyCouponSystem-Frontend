import { Component, OnInit } from '@angular/core';
import { Income } from 'src/app/models/income';
import { IncomeService } from 'src/app/services/income.service';
import { NgForm } from '@angular/forms';
import { IncomeDescription } from 'src/app/enum/income-description.enum';

@Component({
  selector: 'app-income-by-id',
  templateUrl: './income-by-id.component.html',
  styleUrls: ['./income-by-id.component.css']
})
export class IncomeByIDComponent implements OnInit {

  income: Income = new Income();
  isIncomeExsist: boolean = false;
  showCompanyInfoModal: boolean = false;
  incomeDescription = IncomeDescription;

  constructor(private incomeService: IncomeService) { }

  ngOnInit() {
  }

  openCompanyInfo() {
    this.showCompanyInfoModal = !this.showCompanyInfoModal;
  }

  getIncomeById(form: NgForm) {
    this.isIncomeExsist = false;

    this.incomeService.getIncomeById(form.value.incomeID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.income = result.body;
          this.isIncomeExsist = true;
        }
      }, (error) => {
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
