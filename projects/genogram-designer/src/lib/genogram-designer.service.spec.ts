import { TestBed } from '@angular/core/testing';

import { GenogramDesignerService } from './genogram-designer.service';

describe('GenogramDesignerService', () => {
  let service: GenogramDesignerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenogramDesignerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
