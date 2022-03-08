import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../shared/login.service';
import { PaymentDetailService } from '../shared/payment-detail.service';

@Component({
  selector: 'app-prodaj',
  templateUrl: './prodaj.component.html',
  styles: [
  ]
})
export class ProdajComponent implements OnInit {
  userDetails: any;

  constructor(public service: PaymentDetailService, private toastr: ToastrService, private service_user: LoginService, private helper: JwtHelperService, private router: Router) { }

  ngOnInit(): void {
    this.service_user.GetUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res;
      },
      (err: any) => {
        console.log(err);
      },
    );
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
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

}