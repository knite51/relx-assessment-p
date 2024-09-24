import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { CompanyService } from '../services/company.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyDetailsGuard {
  constructor(private companyServ: CompanyService, private router: Router) {}
  canActivate(): boolean | UrlTree {
    return this.authUser();
  }

  authUser(): boolean {
    if (Object.keys(this.companyServ.activeCompany()).length === 0) {
      this.router.navigate(['/']);
    }
    return true;
  }
}
