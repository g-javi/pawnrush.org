import { TestBed } from '@angular/core/testing';

import { PawnRushService } from './pawn-rush.service';

describe('PawnRushService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PawnRushService = TestBed.get(PawnRushService);
    expect(service).toBeTruthy();
  });
});
