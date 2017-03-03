import {Routes,RouterModule} from "@angular/router";

//login
import {LoginComponent} from "./login/login.component";

//admin
import { AdminComponent } from './admin/admin.component';
import { CreateInvoiceComponent } from './admin/create-invoice/create-invoice.component';
import {AdminViewInvoiceComponent} from "./admin/admin-view-invoice/admin-view-invoice.component";

//authService
import {AdminAuth} from './adminAuth.service'


export const ROUTES:Routes = [
    // Main redirect
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    // App views
    {path: 'login', component: LoginComponent},
    {path: 'login/:msg', component: LoginComponent},
    
    // Handle all other routes
   
    {
        path:'admin', 
        component : AdminComponent,
        canActivate : [AdminAuth], 
        children: [
            { path:'', redirectTo: 'create', pathMatch: 'full'},
            { path:'create', component:CreateInvoiceComponent},
            { path:'view', component:AdminViewInvoiceComponent},
            { path:'**', redirectTo: 'create'},

        ]
    },
     {path: '**',    component: LoginComponent }
    
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(ROUTES);
