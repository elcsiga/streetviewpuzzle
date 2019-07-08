import { Component } from '@angular/core';
import { AuthService } from './auth/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'streetviewpuzzle';

  constructor(
    private authService: AuthService
  ) {
    authService.init();
  }


}
