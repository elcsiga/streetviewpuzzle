import { Component } from '@angular/core';
import { AuthService } from './auth/auth-service/auth.service';
import { MapService } from './map/map.service';
import { routeAnimation } from './animations';
import { MainUIStateService } from './main-uistate/main-uistate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routeAnimation ]
})
export class AppComponent {

  currentView$ = this.mapService.currentView$;
  barColor$ = this.mainUiState.barColor$;
  constructor(
    private authService: AuthService,
    private mapService: MapService,
    private mainUiState: MainUIStateService
  ) {
    this.authService.init();
    this.mapService.init();
  }
}
