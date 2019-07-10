import { Component, OnInit } from '@angular/core';
import { Income } from 'src/app/models/income';
import { IncomeDescription } from 'src/app/enum/income-description.enum';
import { IncomeService } from 'src/app/services/income.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-all-incomes',
  templateUrl: './all-incomes.component.html',
  styleUrls: ['./all-incomes.component.css']
})
export class AllIncomesComponent implements OnInit {

  incomes: Income[] = [];
  selectedCompany: Company = new Company();
  isIncomeExsist: boolean = false;
  showCompanyInfoModal: boolean = false;
  incomeDescription = IncomeDescription;

  constructor(private incomeService: IncomeService) { }

  ngOnInit() {
    this.incomeService.getAllIncomes().subscribe(
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

  openCompanyInfo(company: Company) {
    this.selectedCompany = company;
    this.showCompanyInfoModal = !this.showCompanyInfoModal;
  }

  removeIncome(income: Income, index: number) {
    this.incomeService.removeIncome(income.incomeID).subscribe(
      (result) => {
        if (`Result: ${result.status == 200}`) {
          this.isIncomeExsist = true;
          this.incomes.splice(index, 1);
        }
      }, (error) => {
        alert(`Error: ${error.error.errorMessage}`)
      })
  }


}
