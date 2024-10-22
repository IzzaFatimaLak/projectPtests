const { expect } = require("@playwright/test");
const { LoginPage } = require("./PageObjects/Login-page");
const {
  DocumentManager,
} = require("./PageObjects/Full-Employee-pages/Document-Manager-page");

async function searchEmployee(page, empName, id) {
  let employee_tab;
  if (id == 3) {
    await expect(page.getByText('Billal Ahmadsalman.ahmad+')).toBeVisible({timeout:50000});
    employee_tab = await page.locator(
      "div:nth-child(1)>ul>a:nth-child(" + id + ")"
    );
  } else {
    await expect(page.getByText('salman.ahmad+test@paismo.comsalman.ahmad+test@paismo.comAdministrator | Paismo')).toBeVisible({timeout:50000});
    employee_tab = await page
      .locator("div:nth-child(1)>ul>a:nth-child(4)")
      .first();
  }
  await expect(employee_tab).toContainText("Employees");

  await employee_tab.click();
  await expect(page).toHaveTitle(/.*Employees/);

  await expect(
    page.locator(".MuiTableBody-root > :nth-child(1) > :nth-child(2)")
  ).toBeVisible();

  const search_input = await page.locator(
    ".MuiFormControl-root.css-13sljp9>div>input"
  ).or(page.locator(
    ".MuiFormControl-root.css-1nrlq1o-MuiFormControl-root> div > input"
  ));
  await search_input.fill(empName);
  await search_input.press("Enter");

  await expect(page.locator(".MuiBox-root.css-1hwdfm1 > div")).toBeVisible();

  const result = await page.locator(
    ".MuiTableBody-root > :nth-child(1) > :nth-child(2)"
  );
  await expect(result).toBeVisible();
  await result.click();

  const view_full_profile = await page.locator(
    ".MuiBox-root.css-1drjkt2 > div > a > button"
  );
  await expect(view_full_profile).toBeVisible();
  await expect(view_full_profile).toHaveText("View Full Profile");
  await view_full_profile.click();
}

async function profilePage(page) {
  await expect(page).toHaveTitle(/.*Full Profile/);
  await expect(
    (page.locator("div.MuiCardHeader-content.css-11qjisw > h4").first()).or(
      (page.locator("div.MuiCardHeader-content.css-1qbkelo-MuiCardHeader-content > h4").first()
    ))
  ).toBeVisible({ timeout: 50000 });
}

async function employmentPage(page, employment) {
  await profilePage(page);
  await employment.employmentTab();
}

async function payrollPreferencesPage(page, payroll) {
  await profilePage(page);
  await payroll.payrollPreferencesTab();
}
/**
 * Common setup function to be executed before each test.
 * Responsible for setup the document manager
 * @param {*} page
 * @returns
 */
async function documentManagerPage(page) {
  await profilePage(page);
  const documentManager = new DocumentManager(page);
  await documentManager.documentManagerTab();
  return {
    documentManager,
  };
}

async function offBoardingPage(page, offBoarding) {
  await profilePage(page);
  await offBoarding.offBoardingTab();
}

async function settings(page) {
  await expect(page.getByText('salman.ahmad+test@paismo.comsalman.ahmad+test@paismo.comAdministrator | Paismo')).toBeVisible({timeout:50000});
  const setting = await page.getByRole("button", { name: "Settings" });
  await expect(setting).toHaveText("Settings");
  await setting.click();
}

async function companyDetailsPage(page) {
  let company_details_tab = await page.locator(
    "#panel1a-content>div>ul>a:nth-child(1)"
  );
  await expect(company_details_tab).toHaveText("Company Details");
  await company_details_tab.click();
  await expect(page).toHaveTitle(/.*Company Details/);
  await expect(page.getByText("Paismo QA Testing").nth(1)).toBeVisible({
    timeout: 70000,
  });
}

async function departmentWorkLocationPage(page, id) {
  let department_work_location_tab;

  if (id != 2) {
    department_work_location_tab = await page.locator(
      "#panel1a-content>div>ul>a:nth-child(4)"
    );
  } else {
    department_work_location_tab = await page.locator(
      "#panel1a-content>div>ul>a:nth-child(" + id + ")"
    );
  }

  await expect(department_work_location_tab).toHaveText(
    "Departments / Work Locations"
  );
  await department_work_location_tab.click();
  await expect(page).toHaveTitle(/.*Departments/);
  await expect(
    page.getByText("Paismo QA Testing", { exact: true })
  ).toBeVisible({ timeout: 70000 });
  await expect(
    page.getByText("Departments / Work Locations").nth(1)
  ).toBeVisible();
}

async function workSchedulesPtoPage(page, id) {
  let work_schedules_pto_tab;

  if (id != 3) {
    work_schedules_pto_tab = await page.locator(
      "#panel1a-content>div>ul>a:nth-child(4)"
    );
  } else {
    work_schedules_pto_tab = await page.locator(
      "#panel1a-content>div>ul>a:nth-child(" + id + ")"
    );
  }

  await expect(work_schedules_pto_tab).toHaveText("Work Schedules / PTO");
  await work_schedules_pto_tab.click();
  await expect(page).toHaveTitle(/.*Work Schedules \/ PTO/);
  await expect(
    page.getByText("Paismo QA Testing", { exact: true })
  ).toBeVisible({ timeout: 70000 });
  await expect(page.getByText("Work Schedules/Paid Time Off")).toBeVisible();
}

async function payrollPreferencePage(page, id) {
  let payroll_preferences_tab = await page.locator(
    "#panel1a-content>div>ul>a:nth-child(2)"
  );
  await expect(payroll_preferences_tab).toHaveText("Payroll Preferences");
  await expect(payroll_preferences_tab).toBeVisible();
  await payroll_preferences_tab.click();
  await expect(page).toHaveTitle(/.*Payroll Preferences/);
  await expect(
    page.getByText("Paismo QA Testing", { exact: true })
  ).toBeVisible({ timeout: 70000 });
}

async function saveButton(page) {
  const save_btn = page
    .locator(".MuiBox-root.css-110l9qn > button")
    .or(
      page
        .locator(".MuiBox-root.css-70njv6 > button")
        .or(page.locator("div.MuiBox-root.css-z0exoc > button"))
        .or(page.locator("form > div.MuiBox-root.css-spo0uk > button"))
        .or(page.locator(".MuiBox-root.css-u0fxsx > form > button"))
    );
  await expect(save_btn).toHaveText("Save");
  await expect(save_btn).toBeEnabled();
  await save_btn.click();
}

async function createButton(page) {
  const create_btn = page
    .locator("form > div.MuiBox-root.css-spo0uk > button")
    .or(page.locator("div.MuiBox-root.css-z0exoc > button"));

  await expect(create_btn).toHaveText("Create");
  await expect(create_btn).toBeEnabled();
  await create_btn.click();
}
async function success(message, page) {
  const success_msg = page.locator("#notistack-snackbar");
  await expect(success_msg).toHaveText(message);
}

/**
 * Common setup function to be executed before all test.
 * Responsible for authenticating given user and storing its
 * session in given stateFile
 * @param {*} browser
 * @param {*} username
 * @param {*} pass
 * @param {*} statefile
 * @returns {Oject} setups
 */
async function setupBeforeAll(browser, username, pass, statefile) {
  const context = await browser.newContext();
  const setupPage = await context.newPage();
  await setupPage.goto("/", { waitUntil: "domcontentloaded" });

  const login = new LoginPage(setupPage);
  await login.loginFlow(username, pass);

  await context.storageState({ path: statefile });
  await browser.newContext({ storageState: statefile });
  const setupWebContext = await browser.newContext({ storageState: statefile });

  return {
    setupPage,
    setupWebContext,
  };

}

module.exports = {
  saveButton,
  success,
  searchEmployee,
  profilePage,
  employmentPage,
  createButton,
  payrollPreferencesPage,
  documentManagerPage,
  offBoardingPage,
  settings,
  departmentWorkLocationPage,
  payrollPreferencePage,
  workSchedulesPtoPage,
  companyDetailsPage,
  setupBeforeAll,
  
};
