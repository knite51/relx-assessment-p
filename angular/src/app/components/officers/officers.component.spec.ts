import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficersComponent } from './officers.component';
import { OfficersListComponent } from './officers-list/officers-list.component';
import { UpperCasePipe } from '@angular/common';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { mockOfficersData } from '../../mocks/mock';
import { By } from '@angular/platform-browser';

describe('OfficersComponent', () => {
  let component: OfficersComponent;
  let fixture: ComponentFixture<OfficersComponent>;
  let activatedRoute: ActivatedRoute;

  const companyServiceMock = {
    searchOfficers: jest.fn(),
  };

  const activatedRouteMock = {
    params: of({ id: 123456 }),
    data: of({ companyDetails: { id: 123456, name: 'Test Company' } }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficersComponent, OfficersListComponent],
      providers: [
        { provide: CompanyService, useValue: companyServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        UpperCasePipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OfficersComponent);
    component = fixture.componentInstance;
    jest
      .spyOn(companyServiceMock, 'searchOfficers')
      .mockReturnValue(of(mockOfficersData));

    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the company name in uppercase', () => {
    const titleElement: HTMLElement = fixture.debugElement.query(
      By.css('.title')
    ).nativeElement;
    expect(titleElement.textContent).toContain('TEST COMPANY - OFFICERS');
  });

  it('should display the correct company number', () => {
    const companyNumberElement: HTMLElement = fixture.debugElement.query(
      By.css('.contact-number')
    ).nativeElement;
    expect(companyNumberElement.textContent).toContain('123456');
  });

  it('should call fetchOfficers with the correct company ID', () => {
    expect(companyServiceMock.searchOfficers).toHaveBeenCalledWith('123456');
  });

  it('should pass the officers list to OfficersListComponent', () => {
    const officersListComponent = fixture.debugElement.query(
      By.directive(OfficersListComponent)
    ).componentInstance;
    expect(officersListComponent.officersList).toEqual(mockOfficersData.items);
  });
});
