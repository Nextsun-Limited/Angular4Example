import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {
  email: String;
  password: String;

  constructor(
    private authService: AuthService,
    public snackBar: MdSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  onLoginSubmit(emailFC, passwordFC){
    if(emailFC._status !== 'VALID') return false;
    if(passwordFC._status !== 'VALID') return false;

    let user = {
      email: this.email,
      password: this.password
    };

    this.authService.loginUser(user).subscribe(data => {
      if(data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.snackBar.open(data.msg, 'OK');
        this.router.navigate(['/dashboard']);
      } else {
        this.snackBar.open(data.msg, 'OK');
      }
    });
  }

}
