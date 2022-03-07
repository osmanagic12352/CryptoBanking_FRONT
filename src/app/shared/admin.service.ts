import { Injectable } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";



@Injectable({
    providedIn: 'root'
})
export class AdminService {

    roleMatch (allowedRoles: any): boolean {
        var isMatch = false;
        const Token = localStorage.getItem('token');
        if (Token){
        var payLoad = JSON.parse(window.atob(Token.split('.')[1]));
        var userRole = payLoad.role;
        allowedRoles.forEach((element : any) => {
          if (userRole == element) {
            isMatch = true;
            return false;
          }
          else {
            return null
        }
        });
        return isMatch;
        }
        return false;
        
      }
}