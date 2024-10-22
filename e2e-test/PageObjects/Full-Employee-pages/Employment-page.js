//const { page } = require('../../Fixtures/pomFixture');
const { expect } = require("@playwright/test");
const data = require("../../testdata.json");

export class EmploymentDetails {
  constructor(page) {
    this.page = page;
    this.profile_tab = page
      .locator("div:nth-child(1)>ul>a:nth-child(3)")
      .first();
    this.employment_tab = page.locator(
      ".MuiTabs-flexContainer.css-7sga7m> button:nth-child(2)"
    );
    this.edtitEmployment_btn = page.locator(
      ":nth-child(1) > .MuiCardHeader-root > .MuiCardHeader-action > .MuiButtonBase-root"
    );
    this.element_count = page.locator(".MuiMenu-paper.css-1iztolx > ul>li");
  }

  async myProfilePage() {
    await expect(this.page.getByText('salman.ahmad+test@paismo.comsalman.ahmad+test@paismo.comAdministrator | Paismo')).toBeVisible({timeout:50000});
    await expect(this.profile_tab).toContainText("My Profile");
    await this.profile_tab.click();
    await expect(this.page).toHaveTitle(/.*Full Profile/);
    await expect(
      this.page.locator("div.MuiCardHeader-content.css-11qjisw > h4").first()
    ).toBeVisible({ timeout: 50000 });
  }

  async employmentTab() {
    await expect(this.employment_tab).toContainText("Employment");
    await this.employment_tab.click();
    await expect(
      this.page.locator("div.MuiCardHeader-content.css-11qjisw > h4").first()
    ).toBeVisible();
  }

  async editEmployment() {
    await expect(this.edtitEmployment_btn).toBeVisible();
    await this.edtitEmployment_btn.click();
  }

  async dropdown_selection(id) {
    const select = await this.page.locator(
      ".MuiMenu-paper.css-1iztolx > ul > li:nth-child(" + id + ")"
    );
    await expect(select).toBeVisible();
    await select.click();
  }

  async invoke(id) {
    if (id == 2 || id == 6) {
      const set_value = await this.page.locator(
        "form > div:nth-child(" + id + ")>div>div>div>input"
      );
      return set_value;
    } else {
      const set_value = await this.page
        .locator(
          "form > div:nth-child(" + id + ")>div>div>div:nth-child(2)>input"
        )
        .or(
          this.page.locator(
            "form > div:nth-child(" + id + ")>div>div:nth-child(2)>input"
          )
        );
      return set_value;
    }
  }

  x;
  async workEmail() {
    let work_email = await this.invoke(1);
    work_email = await work_email.last();
    await work_email.fill(data.Employment.work_email);
  }

  async workPhone() {
    const work_phone = await this.invoke(2);
    await work_phone.clear();
    await work_phone.fill(data.Employment.work_phone);
  }

  async employmentStartDate() {
    const employment_start_date = await this.invoke(3);
    await employment_start_date.clear();
    await employment_start_date.type(data.Employment.employment_start_date);
  }

  async employmentEndDate(id) {
    let employment_end_date;
    if (id == 5) {
      employment_end_date = await this.page.locator(
        "form > div:nth-child(" + id + ")>div>div:nth-child(2)>input"
      );
    } else {
      employment_end_date = await this.invoke(4);
    }
    await employment_end_date.clear();
    await employment_end_date.type(data.Employment.employment_end_date);
  }
/*
** Field is not avilable
  async workSchedule(id) {
    let work_schedule;
    if (id == 6) {
      work_schedule = await this.invoke(id);
    } else {
      work_schedule = await await this.page.locator(
        "form > div:nth-child(5)>div>div>div>input"
      );
    }
    await work_schedule.clear();
    await work_schedule.type(data.Employment.work_schedule);
    await this.page
      .locator("#workSchedules-select-listbox>li:nth-child(1)")
      .click();
  }
  */

  async employmentPage() {
    await this.myProfilePage();
    await this.employmentTab();
  }
}

export class RoleAndCompensaton {
  constructor(page) {
    this.page = page;
    this.editRolesAndCompensation_btn = page.locator(
      ":nth-child(3) > .MuiCardHeader-root > .MuiCardHeader-action > .MuiButtonBase-root"
    );
  }

  async editRolesAndCompensation() {
    await expect(this.editRolesAndCompensation_btn).toBeVisible();
    await this.editRolesAndCompensation_btn.click();
  }

  async dropdown_selection(id) {
    const select = await this.page.locator(
      ".MuiMenu-paper.css-1iztolx > ul > li:nth-child(" + id + ")"
    );
    await expect(select).toBeVisible();
    await select.click();
  }

  async invoke(id) {
    if (id == 1 || id == 5) {
      const set_value = await this.page.locator(
        "form > div:nth-child(" + id + ")>div>div>div>input"
      );
      return set_value;
    } else if (id == 8) {
      const set_value = await this.page.locator(
        "form > div:nth-child(" + id + ")>div>div"
      );
      return set_value;
    } else {
      const set_value = await this.page
        .locator(
          "form > div:nth-child(" + id + ")>div>div>div:nth-child(2)>input"
        )
        .or(
          this.page.locator(
            "form > div:nth-child(" + id + ")>div>div:nth-child(2)>input"
          )
        );
      return set_value;
    }
  }

  async department() {
    let department = await this.invoke(1);
    department = await department.last();
    await department.fill(data.RolesAndCompensation.department);
    await this.page
      .locator("#departments-select-listbox>li:nth-child(1)")
      .click();
  }

  async designation() {
    const designation = await this.invoke(2);
    await designation.fill(data.RolesAndCompensation.designation);
  }

  async grade() {
    const grade = await this.invoke(3);
    await grade.fill(data.RolesAndCompensation.grade);
  }

  async team() {
    const team = await this.invoke(4);
    await team.fill(data.RolesAndCompensation.team);
  }

  async reportsTo() {
    const reports_to = await this.invoke(5);
    await reports_to.fill(data.RolesAndCompensation.reports_to);
    await this.page
      .locator("#employees-select-listbox>div:nth-child(1)")
      .click();
  }

  async amount() {
    const amount = await this.invoke(7);
    await amount.fill(data.RolesAndCompensation.amount);
  }

  async frequency(id) {
    let frequency;

    if (id != 7) {
      frequency = await this.invoke(8);
    } else {
      frequency = await this.page.locator("form > div:nth-child(7)>div>div");
    }
    await frequency.click();
    await this.dropdown_selection(3);
  }

  async notes(id) {
    let notes;

    if (id != 7) {
      notes = await this.invoke(9);
    } else {
      notes = await this.invoke(7);
    }

    await notes.fill(data.RolesAndCompensation.notes);
  }
}
