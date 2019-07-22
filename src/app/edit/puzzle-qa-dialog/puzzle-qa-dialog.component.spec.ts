import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleQADialogComponent } from './puzzle-qa-dialog.component';

describe('SimplePuzzleDialogComponent', () => {
  let component: PuzzleQADialogComponent;
  let fixture: ComponentFixture<PuzzleQADialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleQADialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleQADialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
