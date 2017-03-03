import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Router} from '@angular/router'
import {url} from '../serverConfig'


import 'rxjs/add/operator/map';

@Injectable()

export class TokenExpiryService{ 
    validate:any;
    headers:Headers;
    options:RequestOptions

	constructor(private http : Http, private router:Router){
        this.headers = new Headers({ 
            'Content-Type': 'application/json'
         });
         this.options = new RequestOptions({ headers: this.headers });
	}

    checkToken(){
        this.http.post(url+'auth',{
            UID: localStorage.getItem('UID'),
            Role: localStorage.getItem('Role'),
            token: localStorage.getItem('token')
        },this.options)
        .map(res => res.json()).subscribe(res=> {
            if(res.status==404){
                this.router.navigate(['/login/Token_Expired']);
            }
        })
    }

}