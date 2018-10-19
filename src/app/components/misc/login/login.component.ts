import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { ApiError } from '../../../shared/models/api-error.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: [null, Validators.compose([
      Validators.required, Validators.email])
    ],
    password: [null, Validators.required]
  });
  apiError: ApiError;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  onSubmit(): void {
    console.log('hola!');
    if (this.loginForm.valid) {
      console.log(this.loginForm);
      this.sessionService.authenticate(this.loginForm.value)
        .subscribe(
          () => {
            this.loginForm.reset();
            this.router.navigate(['/leagues']);
          },
          (error: ApiError) => this.apiError = error
        );
    }
  }
}
