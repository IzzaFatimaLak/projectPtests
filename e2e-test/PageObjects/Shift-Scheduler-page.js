import { da } from "@faker-js/faker";
//const { page } = require('../../Fixtures/pomFixture');
const { expect } = require("@playwright/test");
const data = require("../testdata.json");
const {
  WorkLocations,
} = require("../PageObjects/Settings-pages/Departments-Work-Locations-page");
let shiftId;
let hasFetchedEmployee = false;
export class ShiftScheduler {
  constructor(page) {
    this.page = page;
    this.shiftScheduler_tab = page.getByRole("button", {
      name: "Shift Scheduler Shift",
    });
    this.newShift_btn = page.getByRole("button", { name: "Add new shift" });
    this.shiftTitle = page.getByPlaceholder("Morning Shift");
    this.chooseTime_icon = page.locator("//button[@aria-label='Choose time']");
    this.employee_select = page.locator(
      "#employees-select-listbox>div:nth-child(1)"
    );
    this.select_department = page.locator("//input[@id='departments-select']");
    this.work_location_checkbox = page.locator(
      "//input[@value='specific location']"
    );
    this.work_location_dropdown = page.locator("#workLocations-select");
    this.work_location_selection = page.locator(
      "#workLocations-select-option-0"
    );
    this.clock_in_type_dropdown = page.locator("#form-select-demo").last();
    this.field_location_checkbox = page.locator("//input[@value='field']");

    this.done_btn = page.locator(".MuiBox-root.css-70njv6 > button");
  }

  async validate() {
    const response = this.page.request;
    const apiUrl = "https://api-stg.paismo.com/work-schedules/" + shiftId + "";
    await response.delete(apiUrl, {
      headers: {
        authorization: "Bearer " + data.Auth.token + "",
      },
    });
  }

  async shiftSchedulerPage() {
    await expect(
      this.page.getByText(
        "salman.ahmad+test@paismo.comsalman.ahmad+test@paismo.comAdministrator | Paismo"
      )
    ).toBeVisible({ timeout: 30000 });
    await expect(this.shiftScheduler_tab).toHaveText("Shift Scheduler");
    const responsePromise = this.page.waitForResponse("**/work-schedules");
    await this.shiftScheduler_tab.click();
    const response = await responsePromise;

    await expect(this.page).toHaveTitle(/.*Shifts Manager/);
    await expect(
      this.page.getByRole("heading", { name: "Shift Manager" })
    ).toBeVisible({ timeout: 70000 });
  }

  async addNewShiftButtton() {
    await expect(this.newShift_btn).toBeVisible();
    if (!hasFetchedEmployee) {
      const responsePromise = this.page.waitForResponse("**/employees");
      await this.newShift_btn.click();
      const response = await responsePromise;
      hasFetchedEmployee = true;
    } else {
      await this.newShift_btn.click();
    }
  }

  async editBookTimeOff() {
    await expect(this.editBookTimeOff_icon).toBeVisible();

    await expect(this.editBookTimeOff_icon).toBeEnabled();
    await expect(this.request_status).toHaveText("Pending");
    await this.editBookTimeOff_icon.click();
  }
  /**
   * Resposible for Seting the Time from Time Picker
   * @param {*} hours
   * @param {*} minutes
   * @param {*} meridiem
   */
  async setTime(hours, minutes, meridiem, end_time_status) {
    let hour, minute, merdiem;

    if ((end_time_status = true)) {
      hour = this.page
        .locator(
          "ul[aria-label='Select hours'] > li[aria-label='" + hours + " hours']"
        )
        .last();
      minute = this.page
        .locator(
          "ul[aria-label='Select minutes'] > li[aria-label='" +
            minutes +
            " minutes']"
        )
        .last();
      merdiem = this.page
        .locator(
          "ul[aria-label='Select meridiem'] > li[aria-label='" + meridiem + "']"
        )
        .last();
    } else {
      hour = this.page.locator(
        "ul[aria-label='Select hours'] > li[aria-label='" + hours + " hours']"
      );
      minute = this.page.locator(
        "ul[aria-label='Select minutes'] > li[aria-label='" +
          minutes +
          " minutes']"
      );
      merdiem = this.page.locator(
        "ul[aria-label='Select meridiem'] > li[aria-label='" + meridiem + "']"
      );
    }

    await hour.click();
    await minute.click();
    await merdiem.click();
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
    let set_value;
    if (id == 1 || id == 5) {
      set_value = await this.page.locator(
        "form > div:nth-child(" + id + ")>div>div>div"
      );
    } else {
      set_value = await this.page.locator(
        "form > div:nth-child(2)>div>div>div>input"
      );
    }
    return set_value;
  }

  async title(val) {
    await this.shiftTitle.fill(data.ShiftScheduler.title + " " + val);
  }

  async startTime(scope) {
    await this.chooseTime_icon.first().click();
    if(scope=="Night")
    {
      data.ShiftScheduler.start_time.meridiem= "PM"
    }
    await this.setTime(
      data.ShiftScheduler.start_time.hours,
      data.ShiftScheduler.start_time.minutes,
      data.ShiftScheduler.start_time.meridiem
    );
  }

  async endTime(scope) {
    await this.chooseTime_icon.last().click();
    if(scope=="Night"){
      data.ShiftScheduler.end_time.meridiem= "AM"
    }
    await this.setTime(
      data.ShiftScheduler.end_time.hours,
      data.ShiftScheduler.end_time.minutes,
      data.ShiftScheduler.end_time.meridiem,
      true
    );
  }

  async addDepartment(department) {
    await this.select_department.fill(department);
    await this.page.locator("//li[@id='departments-select-option-0']").click();
  }

  async repeatOn(days) {
    let repeat_on;
    for (let i = 2; i <= days + 1; i++) {
      repeat_on = await this.page.locator(
        "form>div>div>div:nth-child(2)>div:nth-child(2)>div>button:nth-child(" +
          i +
          ")"
      );
      await repeat_on.click();
      await expect(repeat_on).toHaveCSS("background-color", "rgb(92, 77, 185)");
    }
  }

  async addWorkLocation(requirnment) {
    await this.work_location_checkbox.check(); //Click on Add work location Checkbox
    await this.work_location_dropdown.click(); //Click on Add work location dropdown

    await expect(this.work_location_selection).toBeVisible();
    await this.work_location_selection.click(); //Select the location
    await this.clockInRequirement(requirnment);
  }

  async clockInRequirement(requirnment) {
    await this.clock_in_type_dropdown.click(); // Click on Clockin type Dropdown
    let clock_in_type_selection;

    if (requirnment == "No requirements") {
      clock_in_type_selection = this.page.locator("#form-select-demo-option-0");
    } else if (requirnment == "Location Only") {
      clock_in_type_selection = this.page.locator("#form-select-demo-option-1");
    } else {
      clock_in_type_selection = this.page.locator("#form-select-demo-option-2");
    }

    await expect(clock_in_type_selection).toBeVisible();
    await clock_in_type_selection.click();
  }

  async addFieldLocation(page, requirnment) {
    await this.field_location_checkbox.check();

    const newlocation = new WorkLocations(page);
    await newlocation.workLocationName();
    await newlocation.address();
    await this.clockInRequirement(requirnment);
    await newlocation.geofenceRadius();
  }

  async doneButton() {
    await expect(this.done_btn).toHaveText("Done");
    await expect(this.done_btn).toBeEnabled();

    const responsePromise = this.page.waitForResponse("**/work-schedules");
    await this.done_btn.click();
    const response = await responsePromise;
    const responseJson = await response.json();
    if (responseJson.id) shiftId = responseJson.id;
  }

  async delete() {
    this.page.locator("div>[@text='Test Morning Shift noRequirement']");
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

  async verification() {
    const msg = this.page.locator("#notistack-snackbar");
    await expect(msg).toHaveText(/Couldn't create shift: .* overlapping .*/);
  }
}
