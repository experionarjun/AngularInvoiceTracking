import {Routes,RouterModule} from "@angular/router";

//login
import {LoginComponent} from "./login/login.component";

//admin
import { AdminComponent } from './admin/admin.component';
import { CreateInvoiceComponent } from './admin/create-invoice/create-invoice.component';
import {AdminViewInvoiceComponent} from "./admin/admin-view-invoice/admin-view-invoice.component";

//user
import { UserComponent } from './user/user.component';
import { UserViewComponent } from './user/user-view/user-view.component';

//error404
import {Error404Component} from './error404/error404.component'

//authService
import {AdminAuth} from './Services/adminAuth.service';
import {UserAuth} from './Services/userAuth.service'


export const ROUTES:Routes = [
      // Main redirect
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    // App views
    {path: 'login', component: LoginComponent},
    {path: 'login/:msg', component: LoginComponent},

   // admin
    {
        path:'admin', 
        component : AdminComponent,
        canActivate : [AdminAuth], 
        children: [
            { path:'', redirectTo: 'create', pathMatch: 'full'},
            { path:'create', component:CreateInvoiceComponent},
            { path:'view', component:AdminViewInvoiceComponent},
        ]
    },
     { path:'admin/**', component: Error404Component},

    //user
    {
        path:'user', 
        component : UserComponent,
        canActivate : [UserAuth], 
        children: [
            { path:'', redirectTo: 'view', pathMatch: 'full'},
            { path:'view', component:UserViewComponent},
            
        ]
    },
    { path:'user/**', component: Error404Component},
    // Handle all other routes
     {path: '**',    component: Error404Component }
    
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(ROUTES);
