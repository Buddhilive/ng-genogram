import { TestBed } from '@angular/core/testing';

import { DomHandlerService } from './dom-handler.service';

describe('DomHandlerService', () => {
  let service: DomHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
