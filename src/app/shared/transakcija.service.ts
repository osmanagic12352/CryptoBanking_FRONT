import { Injectable } from '@angular/core';
import { Transakcija } from './transakcija.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TransakcijaService {

  constructor(private http:HttpClient) { }

  readonly baseURL = 'http://localhost:5001/api/Transakcija/add-transakcija'
  formData: Transakcija = new Transakcija(); 
 
  postTransakcija(){
    return this.http.post(this.baseURL, this.formData);
  }
}
