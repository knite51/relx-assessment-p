export const mockOfficersData = {
  etag: 'ab270eaa4568613c954ccae7ab7e58b893098fba',
  links: {
    self: '/company/06650586/officers',
  },
  kind: 'officer-list',
  items_per_page: 35,
  items: [
    {
      address: {
        premises: 'Flat 10',
        postal_code: 'AB12 3CD',
        country: 'United Kingdom',
        locality: 'London',
        address_line_1: '123 King Street',
      },
      name: 'John Doe',
      appointed_on: '2022-05-15',
      officer_role: 'Director',
      links: {
        officer: {
          appointments: '/officers/123456/appointments',
        },
      },
      date_of_birth: {
        month: 4,
        year: 1985,
      },
      occupation: 'Software Engineer',
      country_of_residence: 'United Kingdom',
      nationality: 'British',
    },
  ],
  active_count: 2,
  total_results: 1,
};

export const mockCompaniesData = {
  page_number: 1,
  kind: 'search#companies',
  total_results: 1,
  items: [
    {
      company_status: 'Active',
      address_snippet: '1234 Elm Street, Some Town, ST 12345',
      date_of_creation: '2023-02-06',
      matches: {
        title: [1, 2, 3],
      },
      description: 'A technology company specializing in software development.',
      links: {
        self: '/companies/12345678',
      },
      company_number: '12345678',
      title: 'Tech Innovations Ltd',
      company_type: 'Private Limited Company',
      address: {
        premises: 'Suite 100',
        postal_code: '12345',
        country: 'United Kingdom',
        locality: 'London',
        address_line_1: '1 Innovation Way',
      },
      kind: 'Company',
      description_identifier: ['software', 'technology', 'development'],
    },
  ],
  items_per_page: 5,
};
