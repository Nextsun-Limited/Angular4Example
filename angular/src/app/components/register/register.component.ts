import { Component } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: String;
  email: String;
  password: String;

  constructor(
    private authService: AuthService,
    public snackBar: MdSnackBar,
    private router: Router
  ) { }

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  onRegisterSubmit(nameFC, emailFC, passwordFC) {
    if(nameFC._status !== 'VALID') return false;
    if(emailFC._status !== 'VALID') return false;
    if(passwordFC._status !== 'VALID') return false;

    let user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.snackBar.open(data.msg, 'OK');
        this.router.navigate(['/dashboard']);
      } else {
        this.snackBar.open(data.msg, 'OK');
      }
    })
  }

}
