import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor(private http:HttpClient) { }

  readonly baseURL = 'http://localhost:5001/api/PaymentDetail/add-card'
  formData: PaymentDetail = new PaymentDetail(); 
  list: PaymentDetail[] = [];
 
  postPaymentDetail(){
    return this.http.post(this.baseURL, this.formData);
  }

  putPaymentDetail(){
    return this.http.put(`${'http://localhost:5001/api/PaymentDetail/Edit-card-details'}/${this.formData.id}`, this.formData);
  }

  ListCards(){
    this.http.get('http://localhost:5001/api/PaymentDetail/get-all-cards')
      .toPromise()
      .then(res => this.list = res as PaymentDetail[]);
  }

  deletePaymentDetail(id:number){
    return this.http.delete(`${'http://localhost:5001/api/PaymentDetail/Delete-card'}/${id}`);
  }
}
