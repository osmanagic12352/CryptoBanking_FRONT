import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-transakcija',
  templateUrl: './transakcija.component.html',
  styles: [
  ]
})
export class TransakcijaComponent implements OnInit {
  userDetails: any;

  constructor(private router: Router, private service: LoginService, private helper: JwtHelperService) { }

  ngOnInit(): void {
    this.service.GetUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res;
      },
      (err: any) => {
        console.log(err);
      },
    );
  }

  UserAuth() {
    const Token = localStorage.getItem("token");
    if (Token && !this.helper.isTokenExpired(Token)) {
      return true;
    }
    else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
