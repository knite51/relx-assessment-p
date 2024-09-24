import { TestBed } from '@angular/core/testing';

import { CompanyService } from './company.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { mockCompaniesData, mockOfficersData } from '../mocks/mock';
import { environment } from '../../assets/environment';
import { Company } from '../interfaces/model';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService],
    });
    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call searchCompany and return a company response', () => {
    const query = 'Test Company';

    service.searchCompany(query).subscribe((response) => {
      expect(response).toEqual(mockCompaniesData);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/Search?Query=${query}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCompaniesData);
  });

  it('should call searchOfficers and return an officers response', () => {
    const query = '123';

    service.searchOfficers(query).subscribe((response) => {
      expect(response).toEqual(mockOfficersData);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/Officers?CompanyNumber=${query}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockOfficersData);
  });

  it('should set and get activeCompany signal', () => {
    const company: Company = {
      company_status: 'active',
      address_snippet: '123 Test Street',
      date_of_creation: '2023-01-01',
      matches: { title: [1, 2] },
      description: 'Test Company Description',
      links: { self: '/company/123' },
      company_number: '123',
      title: 'Test Company',
      company_type: 'Private',
      address: {
        premises: '123',
        postal_code: 'AB12 3CD',
        country: 'UK',
        locality: 'London',
        address_line_1: 'Test Street',
      },
      kind: 'company',
      description_identifier: ['identifier'],
    };

    service.activeCompany.set(company);

    expect(service.activeCompany()).toEqual(company);
  });
});
