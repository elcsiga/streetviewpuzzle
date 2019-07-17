import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleEditorComponent } from './puzzle-editor.component';

describe('PuzzleEditorComponent', () => {
  let component: PuzzleEditorComponent;
  let fixture: ComponentFixture<PuzzleEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
