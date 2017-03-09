import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap';
import { AlertModule } from 'ng2-bootstrap';
import {PaginationModule} from 'ng2-bootstrap'
import {DataTableModule} from "angular2-datatable";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//JSPDF
// import "../../node_modules/jspdf/dist/jspdf.min.js"

import { AppComponent } from './app.component';

//Auth services
import {AdminAuth} from './Services/adminAuth.service'
import {UserAuth} from './Services/userAuth.service'
import {TokenExpiryService} from './Services/tokenExpiry.service'

//Routes
import {routing} from "./app.routes";

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
import { UserComponent } from './user/user.component';
import { UserViewComponent } from './user/user-view/user-view.component';
import { Error404Component } from './error404/error404.component';



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

    //user
    UserComponent,
    UserViewComponent,
    Error404Component,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    NgbModule.forRoot(),
    DataTableModule,
  ],
  providers: [TokenExpiryService,AdminAuth,UserAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
