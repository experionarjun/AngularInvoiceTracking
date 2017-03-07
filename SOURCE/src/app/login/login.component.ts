import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Md5} from 'ts-md5/dist/md5';

 

import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  error: string;
  responseError:string;
  responseSuccess:String;
  reset:reset;
  msg:string;
  constructor(private LoginService:LoginService,private router:Router, private route:ActivatedRoute ) {
       this.msg = route.snapshot.params['msg'];
       if(this.msg=='Token_Expired'){
         this.msg = 'Session expired, login again';
       }else{
         this.msg=null;
       }
   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      UID: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(20)]),
      password : new FormControl('',[Validators.required, Validators.minLength(5),Validators.maxLength(20)])
    })
    this.responseError = null;
    this.responseSuccess = null;
    this.reset={
      Fail:false,
      Success:false,
      Hidden:false
    }
  }

  login({value,valid}: {value : any , valid : boolean }) {
    if(valid){
      this.LoginService.login(value.UID,Md5.hashStr(value.password)).subscribe(res =>{
        if(res.status == 200){
          this.responseError = null;
          this.responseSuccess = res.message;
            localStorage.setItem("UID", res.UID);
            localStorage.setItem("Role", res.type);
            localStorage.setItem("token", res.token);
            if(res.type == 'Admin'){
              this.router.navigate(["/admin"]);
            }else{
              this.router.navigate(["/user"]);
            }
        }else{
           console.log("fail")
          this.responseSuccess = null;
          this.responseError = res.message;
        }
      })
    }else{
      this.error = 'UserID and password required'
    } 
  }

  forgotPass(email){
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email != "" && re.test(email)) { 
      this.LoginService.reset(email).subscribe(res =>{
        if(res == "Success"){
          this.reset={Fail:false,Success:true,Hidden:true};
        }else{
          this.reset={Fail:true,Success:false,Hidden:false};
        }
      })
    }else{
        this.reset={ Fail:true, Success:false,Hidden:false}
    }
  }


}

export interface reset{
  Fail:boolean;
  Success:boolean;
  Hidden:boolean;
}