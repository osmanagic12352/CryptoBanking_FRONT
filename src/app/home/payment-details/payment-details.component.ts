import { Component, OnInit } from "@angular/core";
import { PaymentDetailService } from "src/app/shared/payment-detail.service";
import { ToastrService } from "ngx-toastr";
import { PaymentDetail } from "src/app/shared/payment-detail.model";
import { LoginService } from "src/app/shared/login.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Component({
    selector: 'app-payment-details',
    templateUrl: './payment-details.component.html',
    styles: [
    ]
  })

  export class PaymentDetailsComponent implements OnInit {
    userDetails: any;

    constructor(public service: PaymentDetailService, private toastr: ToastrService, private service_user: LoginService, private helper: JwtHelperService, private router: Router) { }
  
    ngOnInit(): void {
      this.service.ListCards();

      this.service_user.GetUserProfile().subscribe(
        (res: any) => {
          this.userDetails = res;
        },
        (err: any) => {
          console.log(err);
        },
      );
    }

    populateForm(selectedRecord:PaymentDetail){
        this.service.formData = Object.assign({},selectedRecord);
    }

    onDelete(id:number){
        if(confirm('Da li siguran da želiš obrisati karticu korisnika?')){
            this.service.deletePaymentDetail(id)
                .subscribe(
                    res =>{
                        this.service.ListCards();
                        this.toastr.error("Brisanje uspješno!", 'Brisanje kartice korisnika');
            },
            err => {console.log(err)}
        )
        }
        
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