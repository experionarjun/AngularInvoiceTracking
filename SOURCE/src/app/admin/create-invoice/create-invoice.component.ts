import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin-services';

@Component({
  selector: 'create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
  providers : [AdminService]
})
export class CreateInvoiceComponent implements OnInit {
  model;
  constructor(private AdminService: AdminService ) { }

  ngOnInit() {
  }

}
