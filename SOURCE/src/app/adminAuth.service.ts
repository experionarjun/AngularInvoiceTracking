import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router'

@Injectable()

export class AdminAuth implements CanActivate{
    auth:any;
    constructor(private router:Router){
        this.auth ={
            Role: localStorage.getItem('Role'),
            token: localStorage.getItem('token')
        };
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

