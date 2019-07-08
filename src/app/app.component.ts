import { Component } from '@angular/core';
import { AuthService } from './auth/auth-service/auth.service';
import { MapService } from './map/map/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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


}
