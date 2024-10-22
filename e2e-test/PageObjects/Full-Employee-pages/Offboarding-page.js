//const { page } = require('../../Fixtures/pomFixture');
const { expect } = require("@playwright/test");
const data = require("../../testdata.json");

export class OffboardingDetails {
  constructor(page) {
    this.page = page;
    this.profile_tab = page
      .locator("div:nth-child(1)>ul>a:nth-child(3)")
      .first();
    this.offBoarding_tab = page.locator(
      ".MuiTabs-flexContainer.css-7sga7m> button:nth-child(5)"
    );
    this.editOffBoarding_btn = page.locator(
      ":nth-child(1) > .MuiCardHeader-root > .MuiCardHeader-action > .MuiButtonBase-root"
    );
    this.confirm_btn = page.locator(".MuiButton-textSizeMedium.css-vh7gsq");
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

  async offBoardingTab() {
    await expect(this.offBoarding_tab).toContainText("Offboarding");
    await this.offBoarding_tab.click();
    await expect(
      this.page.locator("div.MuiCardHeader-content.css-11qjisw > h4").first()
    ).toBeVisible();
  }

  async editOffBoarding() {
    await expect(this.editOffBoarding_btn).toBeVisible();
    await this.editOffBoarding_btn.click();
  }

  async dropdown_selection(id) {
    const select = await this.page.locator(
      ".MuiMenu-paper.css-1iztolx > ul > li:nth-child(" + id + ")"
    );
    await expect(select).toBeVisible();
    await select.click();
  }

  async invoke(id) {
    if (id == 3) {
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

  async lastWorkingDate() {
    let last_working_date = await this.invoke(1);
    last_working_date = await last_working_date.last();
    await last_working_date.fill(data.Offboarding.last_working_date);
  }

  async lastEmploymentDate() {
    const last_employment_date = await this.invoke(2);
    await last_employment_date.fill(data.Offboarding.last_employment_date);
  }

  async offboardingReason() {
    let offboarding_reason = await this.invoke(3);
    await offboarding_reason.click();
    await this.dropdown_selection(1);
  }

  async offboardingInterviewDate() {
    const offboarding_interview_date = await this.invoke(4);
    await offboarding_interview_date.fill(
      data.Offboarding.offboarding_interview_date
    );
  }

  async offboardingInterviewNotes() {
    const offboarding_interview_notes = await this.invoke(5);
    await offboarding_interview_notes.fill(
      data.Offboarding.offboarding_interview_notes
    );
  }

  async confirmButton() {
    await expect(this.confirm_btn).toHaveText("Confirm");
    await this.confirm_btn.click();
  }

  async offBoardingPage() {
    await this.myProfilePage();
    await this.offBoardingTab();
  }
}
