import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public snackBar: MdSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    //this.snackBar.open('Goodbye ' + this.authService.user.name + ', see you again soon!', 'Sure!');
    this.snackBar.open('Goodbye, see you again soon!', 'Sure!');
    this.authService.logout();
    this.router.navigate(['/']);
    return false;
  }

}
