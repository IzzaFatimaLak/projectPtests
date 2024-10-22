const { test } = require("../../../Fixtures/pomFixture");
const data = require("../../../testdata.json");
const fs = require('fs');
const {
  saveButton,
  success,
  settings,
  departmentWorkLocationPage,
  createButton,
  setupBeforeAll,
} = require("../../../utils");
const {
  WorkLocations,
  Departments,
} = require("../../../PageObjects/Settings-pages/Departments-Work-Locations-page");

var webContext;
var workLocation;
var department;
var page;

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
  workLocation = new WorkLocations(page);
  department = new Departments(page);
  await page.goto("/");
  await settings(page);
  await departmentWorkLocationPage(page);
});

test.describe("Test the Work Location and Departments", () => {
  test.describe.configure({ mode: "parallel" });

  test.describe("Test the Work Location in the Settings as an Admin Role", () => {
    test.describe.configure({ mode: "serial" });
    test("Add New Work Location", async () => {
      await workLocation.addWorkLocation();
      await workLocation.workLocationName();
      await workLocation.address();
      await workLocation.geofenceRadius();
      await createButton(page);
      await workLocation.validate();
    });

    test("Edit the Work Location", async () => {
      await workLocation.workLocationSearch();
      await workLocation.editWorkLocation();
      await workLocation.editWorkLocationName();
      //await workLocation.editAddress();
      await workLocation.editGeofenceRadius();
      await saveButton(page);
    });

    test("Delete the Work Location", async () => {
      await workLocation.workLocationSearch();
      await workLocation.deleteWorkLocation();
      await workLocation.confirmDeleteButton();
      await success("WorkLocation deleted successfully!", page);
    });
  });

  test.describe("Test the Departments in the Settings as an Admin Role", () => {
    test.describe.configure({ mode: "serial" });
    test("Add New Department", async () => {
      await department.addDepartment();
      await department.departmentName();
      await department.departmentType();
      await department.departmentPto();
      await department.departmentWorkLocation();
      await createButton(page);
      await department.validate();
    });

    test("Edit the Department", async () => {
      await department.departmentSearch();
      await department.editDepartment();
      await department.editDepartmentName();
      await department.editDepartmentType();
      await department.editDepartmentPto();
      await department.editDepartmentWorkLocation();
      await saveButton(page);
    });

    test("Delete the Department", async () => {
      await department.departmentSearch();
      await department.deleteDepartment();
      await department.confirmDeleteButton();
      await success("Department deleted successfully!", page);
    });
  });
});
