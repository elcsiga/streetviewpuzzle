import { Component } from '@angular/core';
import { AuthService } from './auth/auth-service/auth.service';
import { MapService } from './map/map.service';
import { routeAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routeAnimation ]
})
export class AppComponent {

  currentView$ = this.mapService.currentView$;
  
  constructor(
    private authService: AuthService,
    private mapService: MapService
  ) {
    this.authService.init();
    this.mapService.init();
  }
}
