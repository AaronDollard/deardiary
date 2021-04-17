import { TestBed } from '@angular/core/testing';

import { CountryapiService } from './countryapi.service';

describe('CountryapiService', () => {
  let service: CountryapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
