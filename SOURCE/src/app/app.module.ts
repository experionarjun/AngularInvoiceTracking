import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap';
import { AlertModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';

//Auth services
import {AdminAuth} from './adminAuth.service'
import {TokenExpiryService} from './tokenExpiry.service'

//Routes
import {ROUTES, appRoutingProviders} from "./app.routes";

//login
import { LoginComponent } from './login/login.component';

//common
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { SideBarComponent } from './common/side-bar/side-bar.component';


//admin components
import { AdminComponent } from './admin/admin.component';
import { AdminViewInvoiceComponent } from './admin/admin-view-invoice/admin-view-invoice.component';
import { CreateInvoiceComponent } from './admin/create-invoice/create-invoice.component';



@NgModule({
  declarations: [
    AppComponent,
    
    LoginComponent,

    //common
    FooterComponent,
    HeaderComponent,
    SideBarComponent,

    //admin
    AdminComponent,
    AdminViewInvoiceComponent,
    CreateInvoiceComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
  ],
  providers: [AdminAuth,TokenExpiryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
