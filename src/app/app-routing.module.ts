import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, ChildrenOutletContexts } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { JwtGuard } from './JWT/jwt.guard';
import { PaymentDetailsFormComponent } from './home/payment-details/payment-details.form/payment-details-form.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminComponent } from './admin/admin.component';
import { PaymentDetailsComponent } from './home/payment-details/payment-details.component';
import { KupiComponent } from './kupi/kupi.component';
import { ProdajComponent } from './prodaj/prodaj.component';
import { CardEditComponent } from './home/payment-details/card-edit/card-edit.component';




const routes: Routes = [
    {path:'',redirectTo:'/user/login', pathMatch:'full'},
    {
        path: 'user', component: UserComponent,
        children: [
            {path:'register', component: RegisterComponent},
            {path:'login', component: LoginComponent}
        ]
    }, 
    {path:'home', component: HomeComponent, canActivate:[JwtGuard],
     children: [
         {path:'payment-details', component:PaymentDetailsFormComponent}
     ]
    },
    {path:'forbidden', component: ForbiddenComponent},
    {path:'admin', component: AdminComponent, canActivate:[JwtGuard], data: {permittedRoles:['Admin']}},
    {path:'Edit', component: PaymentDetailsComponent,
     children:[
         {path:'kartica', component: PaymentDetailsFormComponent},
         {path:'uredi-karticu', component: CardEditComponent}       
     ]},
    {path:'kupi', component:KupiComponent},
    {path:'prodaj', component:ProdajComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }