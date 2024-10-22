const { test } = require("../../Fixtures/pomFixture");
const { TimeOffRequest } = require("../../PageObjects/Time-Off-Request-page");
const data = require("../../testdata.json");
const { saveButton, success, setupBeforeAll } = require("../../utils");
const fs = require("fs");
var webContext;
var bookTimeOff;
var page;

test.describe.configure({ mode: "serial" });

test.afterAll(async () => {
  fs.unlink("state.json", () => {});
});

test.describe("Test the Time Off Requeste Page as an Admin Role", () => {
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
    bookTimeOff = new TimeOffRequest(page);
    await page.goto("/");
    await bookTimeOff.timeOffRequestsPage();
  });

  test("Add Book Time Off Reequest", async () => {
    await bookTimeOff.bookTimeOffButtton();
    await bookTimeOff.who();
    await bookTimeOff.startTime();
    await bookTimeOff.endTime();
    await bookTimeOff.reason();
    await bookTimeOff.note();
    await bookTimeOff.reviewNote();
    await saveButton(page);
    await bookTimeOff.confirmButton('Save');
    await bookTimeOff.validate();
  });

  test("Edit the Book Time Off Request", async () => {
    await bookTimeOff.editBookTimeOff();
    await bookTimeOff.editStartTime();
    await bookTimeOff.editEndTime();
    await bookTimeOff.editReason();
    await bookTimeOff.editNote();
    await bookTimeOff.editReviewNote();
    await saveButton(page);
    await bookTimeOff.confirmButton('Save');
  });

  test("Declined the Book Time Off Request", async () => {
    await bookTimeOff.requestDeclined();
    await bookTimeOff.confirmButton('Confirm');
    await success("Status updated successfully!", page);
  });

  test("Add Book Time Off Reequest Against Night Shift", async () => {
    await bookTimeOff.bookTimeOffButtton();
    await bookTimeOff.who("new");
    await bookTimeOff.startTime("Night");
    await bookTimeOff.endTime("Night");
    await bookTimeOff.reason();
    await bookTimeOff.note();
    await bookTimeOff.reviewNote();
    await saveButton(page);
    await bookTimeOff.confirmButton('Save');
    await bookTimeOff.validate();
  });

  test("Approve the Book Time Off Request Against Night Shift", async () => {
    await bookTimeOff.requestApproved();
    await bookTimeOff.confirmButton('Confirm');
    await success("Status updated successfully!", page);
  });

});

test.describe("Test the Time Off Requeste Page as an Employee Role", () => {
  test.describe.configure({ mode: "serial" });

   test.beforeAll(async ({ browser }) => {
    const { setupPage, setupWebContext } = await setupBeforeAll(
      browser,
      data.Username.validEmail.emp,
      data.Password.validPassword,
      "state.json"
    );
    page = setupPage;
    webContext = setupWebContext;
  });
   
  test.beforeEach(async () => {
    page = await webContext.newPage();
    bookTimeOff = new TimeOffRequest(page);
    await page.goto("/");
    await bookTimeOff.timeOffRequestsPage();
  });

  test("Add Book Time Off Reequest", async () => {
    await bookTimeOff.bookTimeOffButtton();
    await bookTimeOff.who(true);
    await bookTimeOff.startTime();
    await bookTimeOff.endTime();
    await bookTimeOff.reason();
    await bookTimeOff.note();
    await bookTimeOff.reviewNote();
    await saveButton(page);
    await bookTimeOff.confirmButton('Save');
    await bookTimeOff.validate();
  });

  test("Edit the Book Time Off Request", async () => {
    await bookTimeOff.editBookTimeOff();
    await bookTimeOff.editStartTime();
    await bookTimeOff.editEndTime();
    await bookTimeOff.editReason();
    await bookTimeOff.editNote();
    await bookTimeOff.editReviewNote();
    await saveButton(page);
    await bookTimeOff.confirmButton('Save');
  });

  test("Canceled the Book Time Off Request", async () => {
    await bookTimeOff.requestCanceled();
    await bookTimeOff.confirmButton('Confirm');
    await success("Status updated successfully!", page);
  });
});
