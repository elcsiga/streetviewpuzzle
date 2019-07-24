import { TestBed } from '@angular/core/testing';

import { EditedPuzzleService } from './edited-puzzle.service';

describe('EditedPuzzleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditedPuzzleService = TestBed.get(EditedPuzzleService);
    expect(service).toBeTruthy();
  });
});
