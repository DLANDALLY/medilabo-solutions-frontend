import { TestBed } from '@angular/core/testing';
import { PatientService } from '../../services/patient/patient';

describe('Patient', () => {
  let service: PatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
