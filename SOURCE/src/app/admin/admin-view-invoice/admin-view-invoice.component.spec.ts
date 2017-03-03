import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewInvoiceComponent } from './admin-view-invoice.component';

describe('AdminViewInvoiceComponent', () => {
  let component: AdminViewInvoiceComponent;
  let fixture: ComponentFixture<AdminViewInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
