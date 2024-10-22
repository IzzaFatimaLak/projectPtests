const { test } = require('../../Fixtures/pomFixture')
const data = require('../../testdata.json');
const {setupBeforeAll } = require("../../utils");
const fs = require("fs");
const {EmployeePage}= require("../../PageObjects/Employee-page")

var webContext;
var page;
var employee;


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
     employee = new EmployeePage(page);
     await page.goto("/");
     await employee.employeePage();


  });



  test.describe('Test the Creation of New Employee as Admin Role', () => {
    //test.describe.configure({ mode: 'serial' });
    
    test('Add New Employee by Selecting the Contract', async () => {

        await employee.contractType('Contract');
        await employee.firstName(4,'First Name','Test one');
        await employee.lastName(5,'Last Name','QA');
        await employee.userEmail(6,'User Email','test1@gmail.com');
        await employee.empStartDate(7,'Employment Start Date','09/12/2026');
        await employee.createButton();
        await employee.success('Employee added successfully!');
        await employee.employeeCleanUp();
        
    });

    test('Add New Employee by Selecting the Part Time Contract', async () => {

      await employee.contractType('Part-Time');
      await employee.firstName(4,'First Name','Test Two');
      await employee.lastName(5,'Last Name','QA');
      await employee.userEmail(6,'User Email','test2@gmail.com');
      await employee.empStartDate(7,'Employment Start Date','09/12/2027');
      await employee.createButton();
      await employee.success('Employee added successfully!');
      await employee.employeeCleanUp();
      
    });
  

    test('Add New Employee by Selecting the Full Time Contract', async () => {


      await employee.contractType('Full-Time');
      await employee.firstName(4,'First Name','Test Three');
      await employee.lastName(5,'Last Name','QA');
      await employee.userEmail(6,'User Email','test3@gmail.com');
      await employee.empStartDate(7,'Employment Start Date','09/12/2028');
      await employee.createButton();
      await employee.success('Employee added successfully!');
     
    });

    test('Add New Employee by Selecting the Seasonal Contract', async () => {

      await employee.contractType('Seasonal');
      await employee.firstName(4,'First Name','Test Four');
      await employee.lastName(5,'Last Name','QA');
      await employee.userEmail(6,'User Email','test4@gmail.com');
      await employee.empStartDate(7,'Employment Start Date','09/12/2029');
      await employee.createButton();
      await employee.success('Employee added successfully!');
      await employee.employeeCleanUp();
     
    });
  
  });