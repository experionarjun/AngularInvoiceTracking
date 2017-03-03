import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin-services';

@Component({
  selector: 'app-admin-view-invoice',
  templateUrl: './admin-view-invoice.component.html',
  styleUrls: ['./admin-view-invoice.component.css'],
  providers : [AdminService]
})
export class AdminViewInvoiceComponent implements OnInit {

  invoiceList:InvoiceList;

  constructor(private AdminService: AdminService) { }

  ngOnInit() {
    this.AdminService.getInvoiceList().subscribe(res => {
      this.invoiceList = res;
      
    })
  }

  showDetails(InvID){
    this.AdminService.getInvoiceDetails(InvID).subscribe( res => {
      console.log(res);
    })
  }
 
}

interface InvoiceList{
  InvoiceID:number;
  UserID:string;
  currency:string;
  date_of_issue:Date;
  status:string;
  total:number;
}

