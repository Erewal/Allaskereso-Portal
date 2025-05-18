import { TestBed } from '@angular/core/testing';

import { MunkaService } from './munka.service';

describe('MunkaService', () => {
  let service: MunkaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MunkaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
