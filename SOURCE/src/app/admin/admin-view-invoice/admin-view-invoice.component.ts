import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin-services';

@Component({
  selector: 'app-admin-view-invoice',
  templateUrl: './admin-view-invoice.component.html',
  styleUrls: ['./admin-view-invoice.component.css'],
  providers : [AdminService]
})
export class AdminViewInvoiceComponent implements OnInit {

  invoiceList:InvoiceList[];
  invoiceDetails:InvoiceDetails;
  test:itemList[];

  constructor(private AdminService: AdminService) {}


  ngOnInit() {
    this.AdminService.getInvoiceList().subscribe(res => {
      this.invoiceList = res;
      
    })
  }

  showDetails(InvID){

      this.AdminService.getInvoiceDetails(InvID).subscribe( res => {
      let dummyList =[]; 
      this.invoiceDetails= {
        Details: {
          InvoiceID: res[0].InvoiceID,
          UserID: res[0].UserID,
          currency: res[0].currency,
          date_of_issue: res[0].date_of_issue,
          status: res[0].status,
          total: res[0].total
        },

        Address:res[0].address,
        dueDate:res[0].dueDate,
        invoice_no: res[0].invoice_no,

        List : []
      }

      res.forEach(function(element){
        let list: itemList;
        list = {
        item: element.item,
        desc:element.desc,
        unitp: element.unitp,
        qty: element.qty
        }
      // console.log(list)
        dummyList.push(list);
      })
      this.invoiceDetails.List = dummyList;
      console.log(this.invoiceDetails);
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

interface InvoiceDetails{
  Details:InvoiceList;

  Address: string;
  dueDate:Date;
  invoice_no:string;

  List:itemList[];
}

interface itemList{
  item:string;
  desc:string;
  unitp:number;
  qty:number;


}

