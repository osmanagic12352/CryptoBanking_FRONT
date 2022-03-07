import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html' ,
  styles: [
  ]
})
export class PaymentDetailsFormComponent implements OnInit {

  constructor(public service:PaymentDetailService, 
    private toastr:ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(form:NgForm){
    if(this.service.formData.id == 0)
      this.inserRecord(form);
    else
      this.updateRecord(form);
  }

  inserRecord(form: NgForm){
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.ListCards();
        this.toastr.success('Uspješno unešeno!','Kartični podaci')

      },
      err => {console.log(err);}
    );
  }

  updateRecord(form: NgForm){
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.ListCards();
        this.toastr.info('Uspješno unešeno!','Kartični podaci')

      },
      err => {console.log(err);}
    );
  }

  resetForm(form: NgForm){
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }

}
