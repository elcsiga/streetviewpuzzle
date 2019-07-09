import { Component } from '@angular/core';
import { AuthService } from './auth/auth-service/auth.service';
import { MapService } from './map/map/map.service';
import { RouterOutlet } from '@angular/router';
import { routeAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routeAnimation ]
})
export class AppComponent {
  title = 'streetviewpuzzle';

  constructor(
    private authService: AuthService,
    private mapsService: MapService,
    
  ) {
    authService.init();
    mapsService.init();
  }

  prepareRoute(outlet: RouterOutlet) {
    console.log('jjjj');
    return 'x';
    // return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
