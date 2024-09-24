import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchInputComponent } from './search-input.component';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required validator', () => {
    const searchQuery = component.searchQuery;
    expect(searchQuery).toBeDefined();
    expect(searchQuery.valid).toBeFalsy();
    expect(searchQuery.errors).toEqual({ required: true });
  });

  it('should validate the form and enable the search button', () => {
    const searchQuery = component.searchQuery;
    const button = fixture.debugElement.query(
      By.css('.btn-search')
    ).nativeElement;

    expect(searchQuery.valid).toBeFalsy();
    expect(button.disabled).toBeTruthy();

    searchQuery.setValue('Test Company');
    fixture.detectChanges();

    expect(searchQuery.valid).toBeTruthy();
    expect(button.disabled).toBeFalsy();
  });

  it('should call onSearch when button is clicked', () => {
    const onSearchSpy = jest.spyOn(component, 'onSearch');

    const button = fixture.debugElement.query(
      By.css('.btn-search')
    ).nativeElement;

    component.searchQuery.setValue('Test Company');
    fixture.detectChanges();

    button.click();

    expect(onSearchSpy).toHaveBeenCalled();
  });

  it('should navigate to results page on search', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.searchQuery.setValue('Test Company');
    fixture.detectChanges();

    component.onSearch();

    expect(navigateSpy).toHaveBeenCalledWith(['/results/'], {
      queryParams: { query: 'Test Company', page: 1 },
    });
  });

  it('should call onSearch when enter key is pressed in input field', () => {
    const onSearchSpy = jest.spyOn(component, 'onSearch');

    component.searchQuery.setValue('Test Company');
    fixture.detectChanges();

    const input = fixture.debugElement.query(
      By.css('.company-input')
    ).nativeElement;
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    input.dispatchEvent(event);

    expect(onSearchSpy).toHaveBeenCalled();
  });
});
