import { TestBed } from '@angular/core/testing';

import { LottieFactory } from './lottie-factory';

describe('LottieFactory', () => {
  let service: LottieFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LottieFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
