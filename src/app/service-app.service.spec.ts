import { TestBed } from '@angular/core/testing';

import { ServiceAppService } from './service-app.service';

describe('ServiceAppService', () => {
  let service: ServiceAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
