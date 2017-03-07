import { Component, OnInit } from '@angular/core';
import {UserService} from '../user-services';
import {Router} from '@angular/router'
import * as jsPDF from 'jspdf';

@Component({
  selector: 'user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
  providers:[UserService]
})
export class UserViewComponent implements OnInit {
  
  invoiceList:InvoiceList[];
  invoiceDetails:InvoiceDetails

  totalItems:number;
  currentPage:number;
  offset:number;

  constructor(private UserService : UserService, private router : Router) {
     this.currentPage = 1;
     this.offset = 0;
     this.UserService.getInvoiceCount().subscribe( res =>{
       this.totalItems = res[0].count;
     })
      this.UserService.getInvoiceList(this.offset).subscribe(res => {
        this.invoiceList = res; 
    })

   }

  ngOnInit() {
  }

  pageChanged(event: any): void {
  // console.log('Page changed to: ' + event.page);
  // console.log('Number items per page: ' + event.itemsPerPage);
   this.offset = (event.page - 1) * 10;
   console.log(this.offset);
    this.UserService.getInvoiceList(this.offset).subscribe(res => {
      this.invoiceList = res; 
      
    })
  }

  showDetails(InvID,i){
      this.UserService.getInvoiceDetails(InvID).subscribe( res => {
      if(res.length!=0){
        let dummyList =[]; 
        this.invoiceDetails= {
          Details: {
            InvoiceID: res[0].InvoiceID,
            invoice_no: res[0].invoice_no,
            currency: res[0].currency,
            date_of_issue: res[0].date_of_issue,
            status: res[0].status,
            total: res[0].total,
            dueDate:res[0].dueDate,
          },
          Address:res[0].address,
          UserID: res[0].UserID,
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
          dummyList.push(list);
      })
      this.invoiceDetails.List = dummyList;
      this.invoiceDetails.Address = this.invoiceDetails.Address.split(',').join(',<br>')
       }else{
         alert("Something happened. Please try again");
         this.router.navigate(['/admin']);
       }
      console.log(res);
     })
  }

   savePDF(e:HTMLElement){
    let doc = new jsPDF();
    let specialElementHandlers = {
        '#editor': function(element, renderer) {
            return true;
        }
    };
    doc.fromHTML(e,10, 10, {
        'width': 180,
        'elementHandlers': specialElementHandlers

    });
    doc.save(this.invoiceDetails.Details.invoice_no + ".pdf");
  }

   printPDF(e:HTMLElement){
    let doc = new jsPDF();
    let specialElementHandlers = {
        '#editor': function(element, renderer) {
            return true;
        }
    };
    doc.fromHTML(e,10, 10, {
        'width': 180,
        'elementHandlers': specialElementHandlers

    });
     doc.output("dataurlnewwindow");
  }

}

interface InvoiceList {
  InvoiceID:number;
  invoice_no:string;
  currency:string;
  date_of_issue:Date;
  status:string;
  total:number;
  dueDate:Date;
}

interface InvoiceDetails{
  Details:InvoiceList;
  Address: string;
  UserID : string;
  List:itemList[];
}

interface itemList{
  item:string;
  desc:string;
  unitp:number;
  qty:number;
}