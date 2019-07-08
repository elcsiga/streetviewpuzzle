import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  inProgress = false;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.inProgress = true;
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    )
      .then(re => console.log('LOGIN', re))
      .catch(error => console.error('LOGIN', error))
      .finally(() => this.inProgress = false );
  }
}
