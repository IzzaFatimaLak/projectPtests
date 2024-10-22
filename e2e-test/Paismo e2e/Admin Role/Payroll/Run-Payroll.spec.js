const { test } = require("../../../Fixtures/pomFixture");
const { RunPayroll } = require("../../../PageObjects/Payroll-pages/Run-Payroll-page");
const data = require("../../../testdata.json");
const { saveButton, success, setupBeforeAll } = require("../../../utils");
const fs = require("fs");
var webContext;
var runPayroll;
var page;

test.describe.configure({ mode: "serial" });

test.afterAll(async () => {
  fs.unlink("state.json", () => {});
});

test.describe("Test the Run Payroll page", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeAll(async ({ browser }) => {
    const { setupPage, setupWebContext } = await setupBeforeAll(
      browser,
      data.Username.validEmail.admin,
      data.Password.validPassword,
      "state.json"
    );
    page = setupPage;
    webContext = setupWebContext;
  });


  test.beforeEach(async () => {
    page = await webContext.newPage();
    runPayroll = new RunPayroll(page);
    await page.goto("/");
    await runPayroll.timesheetPage();
  });

  test("Validate the Timesheet Hours with Run Payroll Hours ", async () => {
    await runPayroll.timesheetHours();
    await runPayroll.runPayrolPage();
    await runPayroll.selectRegularPayroll();
    await runPayroll.selectPayPeriod("May 2024");
    await runPayroll.runPayrollBtn();
    await runPayroll.validatePayrollHours();
    // await bookTimeOff.endTime();
    // await bookTimeOff.reason();
    // await bookTimeOff.note();
    // await bookTimeOff.reviewNote();
    // await saveButton(page);
    // await bookTimeOff.confirmButton('Save');
    // await bookTimeOff.validate();
  });

});

