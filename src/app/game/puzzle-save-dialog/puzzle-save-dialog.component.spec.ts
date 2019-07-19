import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleSaveDialogComponent } from './puzzle-save-dialog.component';

describe('PuzzleSaveDialogComponent', () => {
  let component: PuzzleSaveDialogComponent;
  let fixture: ComponentFixture<PuzzleSaveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleSaveDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleSaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
