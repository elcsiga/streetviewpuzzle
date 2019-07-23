import { TestBed } from '@angular/core/testing';

import { PuzzleResolver } from './puzzle-resolver.service';

describe('ResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PuzzleResolver = TestBed.get(PuzzleResolver);
    expect(service).toBeTruthy();
  });
});
