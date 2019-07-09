import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-dialog',
  templateUrl: './signin-dialog.component.html',
  styleUrls: ['./signin-dialog.component.scss']
})
export class SignInDialogComponent implements OnInit {

  inProgress = false;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.inProgress = true;
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    )
      .then(re => {
        this.router.navigate(['/']);
      })
      .catch(error => console.error(error))
      .finally(() => this.inProgress = false);
  }

  signInWithGoogle() {
    this.router.navigate(['/']);
    this.authService.signInWithGoogle()
      .catch(error => console.error(error));
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook();
  }
}
