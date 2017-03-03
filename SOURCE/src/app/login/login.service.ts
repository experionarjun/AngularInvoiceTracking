import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import {url} from '../../serverConfig'


import 'rxjs/add/operator/map';

@Injectable()

export class LoginService{

	constructor(private http : Http){}

    login(UID,password){
        let headers = new Headers({ 'Content-Type': 'application/json', username: UID, password: password });
        let options = new RequestOptions({ headers: headers });
		return this.http.get(url+"login",options)
			.map(res => res.json());
	}
	reset(email){
		 let headers = new Headers({ 'Content-Type': 'application/json'});
		 let options = new RequestOptions({ headers: headers });
		 return this.http.post(url+"login",{email:email},options)
		 	.map(res => res.text());

	}
}