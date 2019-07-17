import { TestBed } from '@angular/core/testing';

import { MainUIStateService } from './main-uistate.service';

describe('MainUIStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainUIStateService = TestBed.get(MainUIStateService);
    expect(service).toBeTruthy();
  });
});
