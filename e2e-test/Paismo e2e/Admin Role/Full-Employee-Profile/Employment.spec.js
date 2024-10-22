const { test } = require('../../../Fixtures/pomFixture');
const data = require('../../../testdata.json');
const fs = require("fs");
const {saveButton,success,searchEmployee, employmentPage, setupBeforeAll}= require('../../../utils');
const {EmploymentDetails, RoleAndCompensaton}= require("../../../PageObjects/Full-Employee-pages/Employment-page");

var webContext;
var page;
var employment;
var rolesAndCompensation;


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
    employment = new EmploymentDetails(page);
    rolesAndCompensation = new RoleAndCompensaton(page);
    await page.goto("/");
    await searchEmployee(page,'three');
    await employmentPage(page,employment);

  });



  test.describe('Test the Employment Page in Employee Full Profile as an Admin Role', () => {
    test.describe.configure({ mode:'parallel' });

    test('Edit the Employment Section', async () => {
  
        await employment.editEmployment();
        await employment.workEmail();
        await employment.workPhone();
        //await employment.employmentStartDate();
        await employment.employmentEndDate(5);
       // await employment.workSchedule(6);
        await saveButton(page);
        await success('Employee edited successfully!',page);
        
        
    });

    test('Edit the Edit the Roles and Compensation Section', async () => {

        await rolesAndCompensation.editRolesAndCompensation();
        await rolesAndCompensation.department();
        await rolesAndCompensation.designation();
        await rolesAndCompensation.grade();
        await rolesAndCompensation.team();
        await rolesAndCompensation.reportsTo();
        await rolesAndCompensation.amount();
        await rolesAndCompensation.frequency();
        await rolesAndCompensation.notes();
        await saveButton(page);
        await success('Employee edited successfully!',page);
    });

  
  });