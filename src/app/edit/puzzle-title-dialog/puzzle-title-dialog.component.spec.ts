import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleTitleDialogComponent } from './puzzle-title-dialog.component';

describe('PuzzleTitleDialogComponent', () => {
  let component: PuzzleTitleDialogComponent;
  let fixture: ComponentFixture<PuzzleTitleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleTitleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleTitleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
