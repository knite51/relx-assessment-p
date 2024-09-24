import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { provideRouter, RouterLinkWithHref } from '@angular/router';
import { mockCompaniesData } from '../../mocks/mock';
import { CompanyService } from '../../services/company.service';
import { CompanyDetailComponent } from './company-detail.component';
import { DebugElement } from '@angular/core';

describe('CompanyDetailComponent', () => {
  let component: CompanyDetailComponent;
  let fixture: ComponentFixture<CompanyDetailComponent>;
  let companyService: CompanyService;

  const companyServiceMock = {
    activeCompany: () => mockCompaniesData.items[0],
  } as unknown as CompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDetailComponent],
      providers: [
        {
          provide: CompanyService,
          useValue: companyServiceMock,
        },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyDetailComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call CompanyService.activeCompany on initialization', () => {
    expect(companyServiceMock.activeCompany()).toEqual(
      mockCompaniesData.items[0]
    );
  });

  it('should display the correct company details', () => {
    const titleElement: HTMLElement = fixture.debugElement.query(
      By.css('.title')
    ).nativeElement;
    expect(titleElement.textContent).toContain('Tech Innovations Ltd');

    const companyNumberElement: HTMLElement = fixture.debugElement.query(
      By.css('.contact-number')
    ).nativeElement;
    expect(companyNumberElement.textContent).toContain('12345678');

    // Check company address
    const addressElement: HTMLElement = fixture.debugElement.query(
      By.css('.address .text')
    ).nativeElement;
    expect(addressElement.textContent).toContain(
      '1234 Elm Street, Some Town, ST 12345'
    );

    // Check company status
    const statusElement: HTMLElement = fixture.debugElement.query(
      By.css('.status .text')
    ).nativeElement;
    expect(statusElement.textContent).toContain('Active');

    // Check company type
    const typeElement: HTMLElement = fixture.debugElement.query(
      By.css('.type.mb-3 .text')
    ).nativeElement;
    expect(typeElement.textContent).toContain('Company');

    // Check company incorporation date
    const incorporationDateElement: HTMLElement = fixture.debugElement.query(
      By.css('.incorporation .text')
    ).nativeElement;
    expect(incorporationDateElement.textContent).toContain('6 February 2023');
  });

  it('should have a link to officers list', () => {
    const officersLink: DebugElement = fixture.debugElement.query(
      By.directive(RouterLinkWithHref)
    );
    const href = officersLink.attributes['href'];
    expect(href).toEqual('/officers-list/12345678');
  });
});
