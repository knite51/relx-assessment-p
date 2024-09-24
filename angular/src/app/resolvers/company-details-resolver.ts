import { Injectable } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { Company } from '../interfaces/model';

@Injectable({
  providedIn: 'root',
})
export class CompanyDetailsResolver {
  constructor(private companyService: CompanyService) {}

  resolve(): { id: string; name: string } {
    const { title, company_number } = this.companyService.activeCompany();
    return { id: company_number, name: title };
  }
}
