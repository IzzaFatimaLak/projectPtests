const { test } = require('../../../Fixtures/pomFixture');
const data = require('../../../testdata.json');
const fs = require("fs");
const {saveButton,success,searchEmployee,payrollPreferencesPage, setupBeforeAll}= require('../../../utils');
const{PayrollDetails, PayrollBankingDetails}= require("../../../PageObjects/Full-Employee-pages/Payroll-Preferences-page")

var webContext;
var page;
var payroll;
var payroll_banking;

test.beforeAll(async ({ browser }) => {
  const { setupPage, setupWebContext } = await setupBeforeAll(
    browser,
    data.Username.validEmail.admin,
    data.Password.validPassword,
    "state2.json"
   );
  page = setupPage;
  webContext = setupWebContext;
});

test.afterAll(async () => {
  fs.unlink("state2.json", () => {});
});


test.beforeEach(async () => {

     page = await webContext.newPage();
     payroll = new PayrollDetails(page);
     payroll_banking = new PayrollBankingDetails(page);
     await page.goto("/");
     await searchEmployee(page,'three');
     await payrollPreferencesPage(page,payroll);
  });



  test.describe('Test the Payroll Preferances Page in the Employee Full Profile as an Admin Role', () => {
    test.describe.configure({ mode:'parallel' });

    test('Update the Payroll Detail Section', async () => {
  
        await payroll.editPayrollDetails();
        await payroll.defaultPaymentType();
        await payroll.secondaryPaymentType();
        await saveButton(page);
        await success('Employee edited successfully!',page);
        
        
    });

    test('Update the Payroll Banking Details Section', async () => {

        await payroll_banking.editPayrollBankingDetails();
        await payroll_banking.bankCountry();
        await payroll_banking.bankName();
        await payroll_banking.accountHolderName();
        await payroll_banking.accountNumber();
        await payroll_banking.routingNumber();
        await payroll_banking.branchName();
        await payroll_banking.branchAddress();
        await payroll_banking.swift();
        await saveButton(page);
        await success('Employee edited successfully!',page);
    });

  
  });