import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {url} from '../../serverConfig'
import {TokenExpiryService} from '../tokenExpiry.service'


import 'rxjs/add/operator/map';

@Injectable()

export class AdminService{
    validate:any;
    headers:Headers;
    options:RequestOptions


	constructor(private http : Http, private tokenExpiry: TokenExpiryService){
        this.validate = {
            UID: localStorage.getItem('UID'),
            Role: localStorage.getItem('Role'),
            token: localStorage.getItem('token')
        }
        this.validate = JSON.stringify(this.validate);
        this.headers = new Headers({ 
            'Content-Type': 'application/json', 
            'Authorization': this.validate
         });
         this.options = new RequestOptions({ headers: this.headers });
         this.tokenExpiry.checkToken();
	}

    getInvoiceList(){
        return this.http.get(url+"auth/Invoice",this.options)
			.map(res => res.json());
            
    }

    getInvoiceDetails(invID){
        
        console.log(invID)
        return this.http.get(url+'auth/Invoice/' + invID, this.options)
            .map(res => res.json())
    }

   
} 

