import { TestBed } from '@angular/core/testing';

import { ClassServiceTsService } from './class-service';

describe('ClassServiceTsService', () => {
  let service: ClassServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
