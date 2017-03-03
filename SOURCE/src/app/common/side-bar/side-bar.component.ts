import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  routerLoc(loc:string):boolean{
    return this.router.url.indexOf(loc) > -1
  }

}
