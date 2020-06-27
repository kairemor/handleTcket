import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../modals/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserAuth } from '../modals/userAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  loginForm: FormGroup;
  error = false;

  ngOnInit() {
    this.authService.logout();
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

  }
  get formValid() {
    return this.loginForm.controls;
  }

  login() {
    this.authService.login(this.loginForm.value)
    .subscribe(
      data => {
        // console.log(resp),
        // console.log(this.loginForm.value);
        this.router.navigate(['/dashboard']);
      },
      err => {
        console.log(err);
        this.error = true;
      });
  }

}
