import { TestBed } from '@angular/core/testing';

import { AdminPageServiceService } from './admin-page-service.service';

describe('AdminPageServiceService', () => {
  let service: AdminPageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
