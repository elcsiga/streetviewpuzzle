import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePuzzleDialogComponent } from './simple-puzzle-dialog.component';

describe('SimplePuzzleDialogComponent', () => {
  let component: SimplePuzzleDialogComponent;
  let fixture: ComponentFixture<SimplePuzzleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplePuzzleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplePuzzleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
