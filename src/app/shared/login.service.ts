import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Login } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  formData: Login = new Login();
  readonly BaseURL = "http://localhost:5001/api/ApplicationUser/login"
  
  postLogin(){
    return this.http.post(this.BaseURL, this.formData);
  }

  GetUserProfile(){
    return this.http.get('http://localhost:5001/api/ApplicationUser/get-loged-UserInfo');
  }
}
