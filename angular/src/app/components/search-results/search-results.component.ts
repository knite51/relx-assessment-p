import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Company } from '../../interfaces/model';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  companiesResult: Company[] = [];
  searchQuery!: string;
  page = 1;
  itemsPerPage = 5;
  totalItems = 20;
  searchResults = signal<Company[]>([]);

  constructor(
    private companyServ: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const { page, query: textQuery } = params;
      this.searchQuery = textQuery;
      this.page = page;
      this.paginate(page);
    });
  }

  selectCompany(company: Company): void {
    this.companyServ.activeCompany.set(company);
    this.router.navigate(['/details', company.company_number]);
  }

  formatDescription(text: string): string {
    const parts = text.split(' - ');
    return parts.length > 1 ? parts[1] : text;
  }

  paginate(page: number) {
    const fullQuery = `${this.searchQuery}&ItemsPerPage=5&StartIndex=${
      (page - 1) * 5
    }`;
    this.companyServ.searchCompany(fullQuery).subscribe((resp) => {
      this.companiesResult = resp.items;
    });
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.retainNavigation();
    this.scrolltoTop();
  }

  retainNavigation() {
    this.router.navigate(['/results'], {
      queryParams: { query: this.searchQuery, page: this.page },
    });
  }

  scrolltoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
