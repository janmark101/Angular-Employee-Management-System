import { TestBed } from '@angular/core/testing';

import { workersServiceService } from './pracownicy-service.service';

describe('PracownicyServiceService', () => {
  let service: workersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(workersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
