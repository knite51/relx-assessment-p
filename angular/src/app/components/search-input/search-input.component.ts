import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent implements OnInit {
  searchQuery = new FormControl('', Validators.required);

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSearch(): void {
    const params = { query: this.searchQuery.value, page: 1 };
    this.router.navigate([`/results/`], {
      queryParams: params,
    });
  }
}
