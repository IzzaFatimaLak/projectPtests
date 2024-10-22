const { test } = require('../../../Fixtures/pomFixture');
const data = require('../../../testdata.json');
const {saveButton,settings,companyDetailsPage,createButton}= require('../../../utils');


test.beforeEach(async ({ page,login}) => {
    await page.goto('/',{waitUntil: 'domcontentloaded'});
    await login.loginFlow(data.Username.validEmail.admin,data.Password.validPassword);
    await settings(page)
    await companyDetailsPage(page)


  });



  test.describe('Test the Company Details and Payslip Documents in the Settings as an Admin Role', () => {
    
    test('Edit Company Details', async ({companyDetails,page}) => {
  
        await companyDetails.editCompanyDetails();
        await companyDetails.editCompanyAddress();
        await companyDetails.editCompanyContactNumber();
        await companyDetails.editCompanyContactEmail();
        await companyDetails.editTaxId();
        await companyDetails.editCountryOfWork();
        await companyDetails.editCompanyIndustry();
        await companyDetails.timezone();
        await saveButton(page);
        
        
    });
  });