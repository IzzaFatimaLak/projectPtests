//const { page } = require('../../Fixtures/pomFixture');
const { expect } = require("@playwright/test");
const data = require("../../testdata.json");

export class PayrollDetails {
  constructor(page) {
    this.page = page;
    this.profile_tab = page
      .locator("div:nth-child(1)>ul>a:nth-child(3)")
      .first();
    this.payrollPreferences_tab = page.locator(
      ".MuiTabs-flexContainer.css-7sga7m> button:nth-child(3)"
    );
    this.editPayrollDetails_btn = page.locator(
      ":nth-child(1) > .MuiCardHeader-root > .MuiCardHeader-action > .MuiButtonBase-root"
    );
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

  async payrollPreferencesTab() {
    await expect(this.payrollPreferences_tab).toContainText(
      "Payroll Preferences"
    );
    await this.payrollPreferences_tab.click();
    await expect(
      this.page.locator("div.MuiCardHeader-content.css-11qjisw > h4").first()
    ).toBeVisible();
  }

  async editPayrollDetails() {
    await expect(this.editPayrollDetails_btn).toBeVisible();
    await this.editPayrollDetails_btn.click();
  }

  async dropdown_selection(id) {
    const select = await this.page.locator(
      ".MuiMenu-paper.css-1iztolx > ul > li:nth-child(" + id + ")"
    );
    await expect(select).toBeVisible();
    await select.click();
  }

  async invoke(id) {
    const set_value = await this.page.locator(
      "form > div:nth-child(" + id + ")>div>div"
    );
    return set_value;
  }

  async defaultPaymentType() {
    let default_payment_type = await this.invoke(1);
    default_payment_type = await default_payment_type.last();
    await default_payment_type.click();
    await this.dropdown_selection(4);
  }

  async secondaryPaymentType() {
    let secondary_payment_type = await this.invoke(2);
    await secondary_payment_type.click();
    await this.dropdown_selection(1);
  }

  async payrollPreferencesPage() {
    await this.myProfilePage();
    await this.payrollPreferencesTab();
  }
}

export class PayrollBankingDetails {
  constructor(page) {
    this.page = page;
    this.editPayrollBankingDetails_btn = page.locator(
      ":nth-child(3) > .MuiCardHeader-root > .MuiCardHeader-action > .MuiButtonBase-root"
    );
  }

  async editPayrollBankingDetails() {
    await expect(this.editPayrollBankingDetails_btn).toBeVisible();
    await this.editPayrollBankingDetails_btn.click();
  }

  async invoke(id) {
    if (id == 1) {
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

  async bankCountry() {
    let bank_country = await this.invoke(1);
    bank_country = await bank_country.last();
    await bank_country.clear();
    await bank_country.type(data.PayrollBankingDetails.bank_country);
    await this.page
      .locator("#country-select-demo-listbox>li:nth-child(1)")
      .click();
  }

  async bankName() {
    const bank_name = await this.invoke(2);
    await bank_name.fill(data.PayrollBankingDetails.bank_name);
  }

  async accountHolderName() {
    const account_holder_name = await this.invoke(3);
    await account_holder_name.fill(
      data.PayrollBankingDetails.account_holder_name
    );
  }

  async accountNumber() {
    const account_number = await this.invoke(4);
    await account_number.fill(data.PayrollBankingDetails.account_number);
  }

  async routingNumber() {
    const routing_number = await this.invoke(5);
    await routing_number.fill(data.PayrollBankingDetails.routing_number);
  }

  async branchName() {
    const branch_name = await this.invoke(6);
    await branch_name.fill(data.PayrollBankingDetails.branch_name);
  }

  async branchAddress() {
    const branch_address = await this.invoke(7);
    await branch_address.fill(data.PayrollBankingDetails.branch_address);
  }

  async swift() {
    const swift = await this.invoke(8);
    await swift.type(data.PayrollBankingDetails.swift);
  }

  async payrollPreferencesPage() {
    await this.myProfilePage();
    await this.employmentTab();
  }
}
