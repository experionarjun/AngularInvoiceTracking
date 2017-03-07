import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router'
import {TokenExpiryService} from './tokenExpiry.service'

@Injectable()

export class AdminAuth implements CanActivate{
    auth:any;
    constructor(private router:Router,private tokenExpiry: TokenExpiryService){
        this.auth ={
            Role: localStorage.getItem('Role'),
            token: localStorage.getItem('token')
        };
        this.tokenExpiry.checkToken();
    }

    canActivate(){
        if(this.auth.token != '' && this.auth.Role=='Admin'){
            return true;
        }else{
            this.router.navigate(['/login'])
            return false;
        }
    }
}

