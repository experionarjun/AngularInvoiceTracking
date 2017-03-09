import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {
  Loc:string;
  constructor(private router: Router) { 
  
   if(router.url.indexOf('admin') > -1){
     this.Loc = '/admin'
   }else if(router.url.indexOf('user') > -1){
     this.Loc = '/user'
   }else{
     this.Loc = '/login'
   }
  }

  ngOnInit() {
  }

  back(){
    this.router.navigate([this.Loc]);
  }

}
