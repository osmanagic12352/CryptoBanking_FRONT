import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './user/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginService } from './shared/login.service';
import { JwtInterceptor } from './JWT/jwt.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtGuard } from './JWT/jwt.guard';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ChartServiceBTC } from './shared/chartBTC.service';
import { ChartServiceETH } from './shared/chartETH.service';
import { ChartServiceBNB } from './shared/chartBNB.service';
import { ChartServiceCAR } from './shared/chartCAR.service';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { PaymentDetailsFormComponent } from './home/payment-details/payment-details.form/payment-details-form.component';
import { PaymentDetailsComponent } from './home/payment-details/payment-details.component';
import { TransakcijaComponent } from './transakcija/transakcija.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    ForbiddenComponent,
    PaymentDetailsFormComponent,
    PaymentDetailsComponent,
    TransakcijaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    NgbModule,
    MatPaginatorModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [LoginService, JwtGuard, ChartServiceBTC, ChartServiceETH, ChartServiceBNB, ChartServiceCAR,{
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

