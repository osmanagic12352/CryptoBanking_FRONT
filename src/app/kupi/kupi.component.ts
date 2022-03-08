import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../shared/login.service';
import { Transakcija } from '../shared/transakcija.model';
import { TransakcijaService } from '../shared/transakcija.service';

@Component({
  selector: 'app-kupi',
  templateUrl: './kupi.component.html',
  styles: [
  ]
})
export class KupiComponent implements OnInit {
  userDetails: any;

  odabranaCoin: string = '';
  coins: any = [
    'Bitcoin',
    'Ethereum',
    'Binance coin',
    'Tether',
    'Ripple',
    'Cardano'
  ];

  countryForm: FormGroup;
  countries = [{
    id: '8f8c6e98',
    name: 'USA',
    code: 'USD'
  },
  {
    id: '169fee1a',
    name: 'Canada',
    code: 'CAD'
  },
  {
    id: '3953154c',
    name: 'UK',
    code: 'GBP'
  }]

  constructor(public service: TransakcijaService, private toastr: ToastrService, private service_user: LoginService, private helper: JwtHelperService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.service_user.GetUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res;
      },
      (err: any) => {
        console.log(err);
      },
    );

    this.countryForm = this.fb.group({
      countryControl: [this.countries[1]]
    });
  }

  onSubmit(form: NgForm) {
    this.service.postTransakcija().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Uspješno unešeno!', 'Kartični podaci')

      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Transakcija();
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

  BiranjeValuta(event: any) {
    this.odabranaCoin = event.target.value;
  }

}


