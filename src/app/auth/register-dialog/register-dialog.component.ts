import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  inProgress = false;
  registerForm = new FormGroup({
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
    this.authService.register(
      this.registerForm.value.email,
      this.registerForm.value.password
    )
      .then(re => {
        console.log('REG', re);
        this.router.navigate(['/']);
      })
      .catch(error => console.error('LOGIN', error))
      .finally(() => this.inProgress = false );
  }
}
