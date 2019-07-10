import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company';

declare var $: any;

@Component({
  selector: 'app-company-modal',
  templateUrl: './company-modal.component.html',
  styleUrls: ['./company-modal.component.css']
})
export class CompanyModalComponent implements OnInit {

  @Input() company: Company = new Company();
  @Output() closeModalEmmiter = new EventEmitter();

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.sendCompany.next(this.company)
  }

  closeModal() {
    this.closeModalEmmiter.emit();
  }

}
