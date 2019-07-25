import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleCheckComponent } from './puzzle-check.component';

describe('PuzzleCheckComponent', () => {
  let component: PuzzleCheckComponent;
  let fixture: ComponentFixture<PuzzleCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
