import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzlePlayDialogComponent } from './puzzle-play-dialog.component';

describe('PuzzlePlayDialogComponent', () => {
  let component: PuzzlePlayDialogComponent;
  let fixture: ComponentFixture<PuzzlePlayDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzlePlayDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzlePlayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
