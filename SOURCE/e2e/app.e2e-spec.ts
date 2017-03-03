import { AngularInvoicePage } from './app.po';

describe('angular-invoice App', () => {
  let page: AngularInvoicePage;

  beforeEach(() => {
    page = new AngularInvoicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
