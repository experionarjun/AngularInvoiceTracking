import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {url} from '../../serverConfig'
import {TokenExpiryService} from '../Services/tokenExpiry.service'


import 'rxjs/add/operator/map';

@Injectable()

export class UserService{
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

    getInvoiceCount(){
        return this.http.get(url+"auth/user/invoiceCount",this.options)
        .map(res=>res.json());
    }
    getInvoiceList(offset:any){
        let header =new Headers({ 
            'Content-Type': 'application/json', 
            'Authorization': this.validate,
            'offset' : offset
         });
        let options = new RequestOptions({ headers: header});
        return this.http.get(url+"auth/user/Invoice",options)
			.map(res => res.json());
            
    }
    getInvoiceDetails(invID){
    return this.http.get(url+'auth/Invoice/' + invID, this.options)
        .map(res => res.json())
    }

}