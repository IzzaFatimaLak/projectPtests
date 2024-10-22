const { test, expect } = require("../../../Fixtures/pomFixture");
const data = require("../../../testdata.json");
const fs = require('fs');
const {
  PayRollCompanyDetails,
  PayrollBanking,
  CustomPayrollFields,
} = require("../../../PageObjects/Settings-pages/Payroll-Preferences-page");
const {
  success,
  saveButton,
  settings,
  payrollPreferencePage,
  createButton,
  setupBeforeAll,
} = require("../../../utils");

var webContext;
var payrollCompanyDetail;
var payrollBankingDetail;
var customPayrollField;
var page;

test.beforeAll(async ({ browser }) => {
  const { setupPage, setupWebContext } = await setupBeforeAll(
    browser,
    data.Username.validEmail.admin,
    data.Password.validPassword,
    "state1.json"
  );
  page = setupPage;
  webContext = setupWebContext;
});
test.afterAll(async () => {
   fs.unlink("state1.json", () => {});
 });

test.beforeEach(async () => {
  page = await webContext.newPage();
  payrollCompanyDetail = new PayRollCompanyDetails(page);
  payrollBankingDetail = new PayrollBanking(page);
  customPayrollField = new CustomPayrollFields(page);
  await page.goto("/");
  await settings(page);
  await payrollPreferencePage(page);
});

test.describe("Test the Payroll Preferences in the Settings as an Admin Role", () => {
  test.describe.configure({ mode: "parallel" });

  test("Edit Payroll Company Details Section", async () => {
    await payrollCompanyDetail.editButton();
    await payrollCompanyDetail.companyName();
    await payrollCompanyDetail.companyAddress();
    await payrollCompanyDetail.companyContactNumber();
    await payrollCompanyDetail.companyEmail();
    await saveButton(page);
  });

  test("Edit Payroll Banking Details Section", async () => {
    await payrollBankingDetail.editButton();
    await payrollBankingDetail.bankCountry();
    await payrollBankingDetail.bankName();
    await payrollBankingDetail.accountHolderName();
    await payrollBankingDetail.accountNumber();
    await payrollBankingDetail.bankKey();
    await payrollBankingDetail.branchName();
    await payrollBankingDetail.branchAddress();
    await payrollBankingDetail.swift();
    await saveButton(page);
  });
});

test.describe("Test the Custom Payroll Field Section in Payroll Preferences in the Settings as an Admin Role", () => {
  test.describe.configure({ mode: "parallel" });

  test.beforeEach(async () => {
    await expect(page.getByRole("columnheader", { name: "Name" })).toBeVisible({
      timeout: 70000,
    });
  });

  test.describe("Custom Payroll Field Section for Everyone", () => {
    test.describe.configure({ mode: "serial" });

    test("Add Custom Payroll Field for Everyone", async () => {
      await customPayrollField.addPayrollField();
      await customPayrollField.applyTo(1);
      await customPayrollField.fieldName();
      await customPayrollField.fieldType();
      await createButton(page);
      await customPayrollField.validate(0);
    });

    test("Edit Custom Payroll Field for Everyone", async () => {
      await customPayrollField.searchPayrollField();
      await customPayrollField.editButton();
      await customPayrollField.editfieldName();
      await saveButton(page);
    });

    test("Delete Custom Payroll Field for Everyone", async () => {
      await customPayrollField.searchPayrollField();
      await customPayrollField.deleteCustomPayrollField();
      await customPayrollField.confirmDeleteButton();
      await success("Concept deleted successfully!", page);
    });
  });

  test.describe("Custom Payroll Field Section for Department", () => {
    test.describe.configure({ mode: "serial" });

    test("Add Custom Payroll Field for Department", async () => {
      await customPayrollField.departmentTab(1);
      await customPayrollField.addPayrollField();
      await customPayrollField.applyTo(3);
      await customPayrollField.department(1);
      await customPayrollField.payrollField(1);
      await createButton(page);
      await customPayrollField.validate(1);
    });

    test("Edit Custom Payroll Field for Department", async () => {
      await customPayrollField.departmentTab(1);
      await customPayrollField.editButton();
      await customPayrollField.editdepartment(2);
      await customPayrollField.editpayrollField(1);
      await saveButton(page);
    });

    test("Delete Custom Payroll Field for Department", async () => {
      await customPayrollField.departmentTab(1);
      await customPayrollField.deleteCustomPayrollField();
      await customPayrollField.confirmDeleteButton();
      await success("Concept deleted successfully!", page);
    });
  });

  test.describe("Custom Payroll Field Section for Employee", () => {
    test.describe.configure({ mode: "serial" });

    test("Add Custom Payroll Field for Employee", async () => {
      await customPayrollField.emplpoyeeTab(2);
      await customPayrollField.addPayrollField();
      await customPayrollField.applyTo(2);
      await customPayrollField.employee(1);
      await customPayrollField.payrollField(1);
      await createButton(page);
      await customPayrollField.validate(2);
    });

    test("Edit Custom Payroll Field for Employee", async () => {
      await customPayrollField.emplpoyeeTab(2);
      await customPayrollField.editButton();
      await customPayrollField.editEmployee(2);
      await saveButton(page);
    });

    test("Delete Custom Payroll Field for Employee", async () => {
      await customPayrollField.emplpoyeeTab(2);
      await customPayrollField.deleteCustomPayrollField();
      await customPayrollField.confirmDeleteButton();
      await success("Concept deleted successfully!", page);
    });
  });
});
