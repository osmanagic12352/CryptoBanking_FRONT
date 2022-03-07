import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  formData: User = new User();
  readonly BaseURL = "http://localhost:5001/api/ApplicationUser/Registracija_User"
  
  postUser(){
    return this.http.post(this.BaseURL, this.formData);
  }
}

