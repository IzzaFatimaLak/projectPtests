//const { page } = require('../../Fixtures/pomFixture');
const { expect } = require("@playwright/test");
const data = require("../testdata.json");

export class TimeOffRequest {
  constructor(page) {
    this.page = page;
    this.timeOffRequests_tab = page.getByRole("button", {
      name: "Time Off Requests Time Off",
    });
    this.bookTimeOff_btn = page.getByRole("button", { name: "Book Time Off" });
    this.employee_select = page.locator(
      "#employees-select-listbox>div:nth-child(1)"
    );
    this.editBookTimeOff_icon = page.locator(
      "table > tbody > tr:nth-child(1) > td:nth-child(9) > span >button"
    );
    this.request_status = page.locator(
      "table > tbody > tr:nth-child(1) > td:nth-child(8) >div>#status-button"
    );
    this.element_count = page.locator(".MuiMenu-paper.css-1iztolx > ul>li");
    this.validation = page.locator(
      "table > tbody > tr:nth-child(1) > td:nth-child(8)>div>button"
    );
  }

  async validate() {
    await this.validation.waitFor();
    await expect(this.validation).toHaveText("Pending");
  }

  async timeOffRequestsPage() {
    //await expect(this.page.getByText('salman.ahmad+test@paismo.comsalman.ahmad+test@paismo.comAdministrator | Paismo')).toBeVisible({timeout:50000});

    await expect(this.timeOffRequests_tab).toHaveText("Time Off Requests");
    await this.timeOffRequests_tab.click();
    await expect(this.page).toHaveTitle(/.*Time Off Requests/);
    await expect(
      this.page.getByRole("heading", { name: "Schedules, Timesheets & Leave" })
    ).toBeVisible({ timeout: 70000 });
    await expect(
      this.page.getByRole("heading", { name: "Time Off Requests" })
    ).toBeVisible();
  }

  async bookTimeOffButtton() {
    await expect(this.bookTimeOff_btn).toBeVisible();
    await this.bookTimeOff_btn.click();
  }

  async editBookTimeOff() {
    await expect(this.editBookTimeOff_icon).toBeVisible();

    await expect(this.editBookTimeOff_icon).toBeEnabled();
    await expect(this.request_status).toHaveText("Pending");
    await this.editBookTimeOff_icon.click();
  }

  async confirmButton(butonText) {
    let confirm_btn = this.page.getByRole("button", {
      name: "" + butonText + "",
    });
    await expect(confirm_btn).toHaveText(butonText);
    await confirm_btn.click();
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
        "form > div:nth-child(" + id + ")>div>div>div"
      );
      return set_value;
    } else {
      const set_value = await this.page.locator(
        "form > div:nth-child(" + id + ")>div>div:nth-child(2)>input"
      );
      return set_value;
    }
  }

  async who(value) {
    const who = await this.invoke(1);
    await expect(who).toContainText("Who");
    await who.click();
    const employee_count = await this.page
      .locator("#employees-select-listbox>div")
      .count();

    if (value == true) {
      await expect(employee_count).toEqual(1);
    } else {
      await expect(employee_count).toBeGreaterThan(1);
      if(value=="new")
      {
        await who.pressSequentially(value);
      }
    }

    await this.employee_select.click();
  }

  async startTime(shift) {
    const start_time = await this.invoke(3);
    await start_time.click();
    if (shift=="Day")
    {
    await start_time.type(
      data.TimeOffRequest.start_date_time.date +
        data.TimeOffRequest.start_date_time.time
    );}
    else
    {
      data.TimeOffRequest.start_date_time.date= "5/05/2025";
      data.TimeOffRequest.start_date_time.time= "09:00 PM";
      await start_time.type(
        data.TimeOffRequest.start_date_time.date +
          data.TimeOffRequest.start_date_time.time
      );

    }
  }

  async endTime(shift) {
    const end_time = await this.invoke(4);
    await end_time.click();
    if (shift=="Day")
    {
    await end_time.type(
      data.TimeOffRequest.end_date_time.date +
        data.TimeOffRequest.end_date_time.time
    );}
    else
    {
      data.TimeOffRequest.end_date_time.date= "5/06/2025";
      data.TimeOffRequest.end_date_time.time= "02:00 AM";
      await end_time.type(
        data.TimeOffRequest.end_date_time.date +
          data.TimeOffRequest.end_date_time.time
      );

    }
  }

  async reason() {
    const reason = await this.invoke(5);
    await reason.click();
    await this.page
      .locator("#form-select-demo-listbox>li>ul>li:nth-child(1)")
      .click();
  }

  async note() {
    const note = await this.invoke(6);
    await note.fill(data.TimeOffRequest.note);
  }

  async reviewNote() {
    const note = await this.invoke(7);
    await note.fill(data.TimeOffRequest.review_note);
  }

  async editStartTime() {
    const start_time = await this.invoke(4);
    await start_time.clear();
    await start_time.type(
      data.TimeOffRequest.start_date_time.editDate +
        data.TimeOffRequest.start_date_time.editTime
    );
  }

  async editEndTime() {
    const end_time = await this.page.locator(
      "form > div:nth-child(5)>div>div:nth-child(2)>input"
    );
    await end_time.clear();
    await end_time.type(
      data.TimeOffRequest.end_date_time.editDate +
        data.TimeOffRequest.end_date_time.editTime
    );
  }

  async editReason() {
    const reason = await this.page.locator(
      "form > div:nth-child(6)>div>div>div"
    );
    await reason.click();
    await this.page
      .locator("#form-select-demo-listbox>li>ul>li:nth-child(5)")
      .click();
  }

  async editNote() {
    const note = await this.invoke(7);
    await note.fill("updated" + data.TimeOffRequest.note);
  }

  async editReviewNote() {
    const note = await this.invoke(8);
    await note.fill("updated" + data.TimeOffRequest.review_note);
  }
  async requestApproved() {
    await this.request_status.click();
    await this.dropdown_selection(1);
  }

  async requestDeclined() {
    await this.request_status.click();
    await this.dropdown_selection(2);
  }

  async requestCanceled() {
    await this.request_status.click();
    await this.dropdown_selection(1);
  }
}
