import { TestBed } from '@angular/core/testing';

import { ArticuloSelecServiceService } from './articulo-selec-service.service';

describe('ArticuloSelecServiceService', () => {
  let service: ArticuloSelecServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticuloSelecServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
