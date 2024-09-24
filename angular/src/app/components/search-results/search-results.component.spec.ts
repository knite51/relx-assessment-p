import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { of } from 'rxjs';
import { mockCompaniesData } from '../../mocks/mock';
import { CompanyService } from '../../services/company.service';
import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const companyServiceMock = {
    activeCompany: {
      set: jest.fn(),
    },
    searchCompany: jest.fn(),
  } as unknown as CompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchResultsComponent,
        NgxPaginationModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: CompanyService, useValue: companyServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ page: 1, query: 'test' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;

    jest
      .spyOn(companyServiceMock, 'searchCompany')
      .mockReturnValue(of(mockCompaniesData));

    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  beforeEach(() => {
    window.scroll = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call paginate on initialization with correct page number', () => {
    const paginateSpy = jest.spyOn(component, 'paginate');

    component.ngOnInit();
    expect(paginateSpy).toHaveBeenCalledWith(1);
  });

  it('should display a list of companies', () => {
    component.paginate(1);
    fixture.detectChanges();

    const companies = fixture.nativeElement.querySelectorAll('.item');
    expect(companies.length).toBe(1);
    expect(companies[0].textContent).toContain('Tech Innovations Ltd');
  });

  it('should format the description correctly', () => {
    const description = '12345 - Some details about the company';
    const formattedDescription = component.formatDescription(description);

    expect(formattedDescription).toBe('Some details about the company');
  });

  it('should navigate to the company details page on selectCompany', () => {
    const spyrouter = jest.spyOn(router, 'navigate');
    const company = mockCompaniesData.items[0];

    component.selectCompany(company);
    expect(companyServiceMock.activeCompany.set).toHaveBeenCalledWith(company);
    expect(spyrouter).toHaveBeenCalledWith([
      '/details',
      company.company_number,
    ]);
  });

  it('should call the API on page change and update the results', () => {
    component.onPageChange(2);
    fixture.detectChanges();

    expect(companyServiceMock.searchCompany).toHaveBeenCalled();
    expect(component.companiesResult.length).toBe(1);
  });

  it('should retain navigation state after page change', () => {
    const spyRetainNavigation = jest.spyOn(component, 'retainNavigation');
    const spyrouter = jest.spyOn(router, 'navigate');

    component.onPageChange(2);
    expect(spyRetainNavigation).toHaveBeenCalled();
    expect(spyrouter).toHaveBeenCalledWith(['/results'], {
      queryParams: { query: component.searchQuery, page: 2 },
    });
  });
});
