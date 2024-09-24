import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { OfficersListComponent } from './officers-list/officers-list.component';
import { UpperCasePipe } from '@angular/common';
import { Officers } from '../../interfaces/model';
import { CompanyService } from '../../services/company.service';

interface CompanyDetails {
  id: number;
  name: string;
}

@Component({
  selector: 'app-officers',
  standalone: true,
  imports: [OfficersListComponent, UpperCasePipe],
  templateUrl: './officers.component.html',
  styleUrl: './officers.component.scss',
})
export class OfficersComponent implements OnInit {
  officersResult: Officers[] = [];
  companyDetails: CompanyDetails = {} as CompanyDetails;

  constructor(
    private companyServ: CompanyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const { id } = params;
      this.fetchOfficers(id);
    });

    this.route.data.subscribe((data) => {
      this.companyDetails = data['companyDetails'];
    });
  }

  fetchOfficers(companyId: number, page = 1): void {
    const fullQuery = `${companyId}`;
    this.companyServ.searchOfficers(fullQuery).subscribe((resp) => {
      this.officersResult = resp.items;
    });
  }
}
