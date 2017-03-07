import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-services';
import { Router } from '@angular/router'
import { reset } from '../../login/login.component';

import * as jsPDF from 'jspdf';



@Component({
  selector: 'app-admin-view-invoice',
  templateUrl: './admin-view-invoice.component.html',
  styleUrls: ['./admin-view-invoice.component.css'],
  providers: [AdminService]
})
export class AdminViewInvoiceComponent implements OnInit {

  invoiceList: InvoiceList[];
  invoiceDetails: InvoiceDetails;
  test: itemList[];
  saveStatusButton: boolean;
  newStatus: string;
  detailOf: number;
  statusChangeALert: reset;

  totalItems: number;
  currentPage: number;
  offset: number;


  constructor(private AdminService: AdminService, private router: Router) {
    this.currentPage = 1;
    this.offset = 0;

    this.AdminService.getInvoiceCount().subscribe(res => {
      this.totalItems = res[0].count;
    })

    this.AdminService.getInvoiceList(this.offset).subscribe(res => {
      this.invoiceList = res;
    })

    this.statusChangeALert = {
      Fail: false,
      Success: false,
      Hidden: false
    }
  }


  ngOnInit() {

    this.saveStatusButton = false;
  }


  pageChanged(event: any): void {
    this.offset = (event.page - 1) * 10;
    this.AdminService.getInvoiceList(this.offset).subscribe(res => {
      this.invoiceList = res;
    })
  }


  showDetails(InvID, i) {
    this.statusChangeALert = {
      Success: false,
      Fail: false,
      Hidden: false
    }
    this.detailOf = i;
    this.AdminService.getInvoiceDetails(InvID).subscribe(res => {
      if (res.length != 0) {
        let dummyList = [];
        this.invoiceDetails = {
          Details: {
            InvoiceID: res[0].InvoiceID,
            UserID: res[0].UserID,
            currency: res[0].currency,
            date_of_issue: res[0].date_of_issue,
            status: res[0].status,
            total: res[0].total
          },

          Address: res[0].address,
          dueDate: res[0].dueDate,
          invoice_no: res[0].invoice_no,

          List: []
        }

        res.forEach(function (element) {
          let list: itemList;
          list = {
            item: element.item,
            desc: element.desc,
            unitp: element.unitp,
            qty: element.qty
          }
          dummyList.push(list);
        })
        this.invoiceDetails.List = dummyList;
        this.invoiceDetails.Address = this.invoiceDetails.Address.split(',').join(',<br>')
      } else {
        alert("Something happened. Please try again");
        this.router.navigate(['/admin']);
      }

    })
  }

  saveNewSatus(value: string) {
    if (confirm("Do you want to update status?")) {
      this.saveStatusButton = false;
      this.AdminService.changeStatus(this.invoiceDetails.Details.InvoiceID, value).subscribe(res => {
        if (res == 'updated') {
          this.statusChangeALert.Success = true;
          this.statusChangeALert.Fail = false;
          this.invoiceDetails.Details.status = value;
          (<HTMLInputElement>document.getElementById('saveStatusSelect')).value = value;
          this.invoiceList[this.detailOf].status = value;
        } else {
          this.statusChangeALert.Success = false;
          this.statusChangeALert.Fail = true;
          (<HTMLInputElement>document.getElementById('saveStatusSelect')).value = this.invoiceDetails.Details.status;
        }
      })

    } else {
      this.saveStatusButton = false;
      (<HTMLInputElement>document.getElementById('saveStatusSelect')).value = this.invoiceDetails.Details.status;
    }
  }

  savePDF(e: HTMLElement) {
    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    doc.fromHTML(e, 10, 10, {
      'width': 180,
      'elementHandlers': specialElementHandlers

    });
    doc.save(this.invoiceDetails.invoice_no + ".pdf");
  }

  printPDF(e: HTMLElement) {
    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    doc.fromHTML(e, 10, 10, {
      'width': 180,
      'elementHandlers': specialElementHandlers

    });
    doc.output("dataurlnewwindow");
  }

}

interface InvoiceList {
  InvoiceID: number;
  UserID: string;
  currency: string;
  date_of_issue: Date;
  status: string;
  total: number;
}

interface InvoiceDetails {
  Details: InvoiceList;
  Address: string;
  dueDate: Date;
  invoice_no: string;
  List: itemList[];
}

interface itemList {
  item: string;
  desc: string;
  unitp: number;
  qty: number;
}

