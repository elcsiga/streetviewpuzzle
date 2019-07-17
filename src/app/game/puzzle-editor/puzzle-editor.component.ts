import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainUIStateService } from 'src/app/main-uistate/main-uistate.service';

@Component({
  selector: 'app-puzzle-editor',
  templateUrl: './puzzle-editor.component.html',
  styleUrls: ['./puzzle-editor.component.scss']
})
export class PuzzleEditorComponent implements OnInit, OnDestroy {

  constructor(
    private mainUiState: MainUIStateService
  ) { }

  ngOnInit() {
    this.mainUiState.setBarColor('light');
  }
  ngOnDestroy() {
    this.mainUiState.setBarColor('dark');
  }

}
