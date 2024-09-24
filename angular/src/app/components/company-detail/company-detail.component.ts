import { Component, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../interfaces/model';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, TitleCasePipe],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.scss',
})
export class CompanyDetailComponent {
  company: Company = {} as Company;
  constructor(private companyServ: CompanyService) {
    this.company = this.companyServ.activeCompany();
  }
}
