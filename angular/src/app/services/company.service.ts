import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../assets/environment';
import {
  Company,
  CompanyResponse,
  OfficersResponse,
} from '../interfaces/model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  readonly apiUrl = environment.apiUrl;
  activeCompany = signal<Company>({} as Company);

  constructor(private http: HttpClient) {}

  searchCompany(query: string): Observable<CompanyResponse> {
    return this.http.get<CompanyResponse>(
      `${this.apiUrl}/Search?Query=${query}`
    );
  }

  searchOfficers(query: string): Observable<OfficersResponse> {
    return this.http.get<OfficersResponse>(
      `${this.apiUrl}/Officers?CompanyNumber=${query}`
    );
  }
}
