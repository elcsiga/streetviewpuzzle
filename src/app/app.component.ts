import { Component } from '@angular/core';
import { AuthService } from './auth/auth-service/auth.service';
import { MapService } from './map/map/map.service';
import { routeAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routeAnimation ]
})
export class AppComponent {
  user$ = this.authService.user$;
  
  constructor(
    private authService: AuthService,
    private mapsService: MapService
  ) {
    this.authService.init();
    this.mapsService.init();
  }

  logout() {
    this.authService.logout();
  }
}
