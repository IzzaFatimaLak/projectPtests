//const { page } = require('../../Fixtures/pomFixture');
const { expect } = require("@playwright/test");
const data = require("../../testdata.json");

export class ProfileDetails {
  constructor(page) {
    this.page = page;
    this.edtitProfile_btn = page.locator(
      ":nth-child(2) > .MuiCardHeader-root > .MuiCardHeader-action > .MuiButtonBase-root"
    );
    this.element_count = page.locator(".MuiMenu-paper.css-1iztolx > ul>li");
  }

  async myProfileTab(id) {
    let profile_tab;
    if (id == 2) {
      await expect(this.page.getByText('Billal Ahmadsalman.ahmad+')).toBeVisible({timeout:50000});
      profile_tab = await this.page.locator(
        "div:nth-child(1)>ul>a:nth-child(" + id + ")"
      );
    } else {
      await expect(this.page.getByText('salman.ahmad+test@paismo.comsalman.ahmad+test@paismo.comAdministrator | Paismo')).toBeVisible({timeout:50000});
      profile_tab = await this.page
        .locator("div:nth-child(1)>ul>a:nth-child(3)")
        .first();
    }

    await expect(profile_tab).toContainText("My Profile");
    await profile_tab.click();
    await expect(this.page).toHaveTitle(/.*Full Profile/);
    await expect(
      this.page.locator("div.MuiCardHeader-content.css-11qjisw > h4").first()
    ).toBeVisible({ timeout: 50000 });
  }

  async editProfile() {
    await expect(this.edtitProfile_btn).toBeVisible();
    await this.edtitProfile_btn.click();
  }

  async dropdown_selection(id) {
    const select = await this.page.locator(
      ".MuiMenu-paper.css-1iztolx > ul > li:nth-child(" + id + ")"
    );
    await expect(select).toBeVisible();
    await select.click();
  }

  async invoke(id) {
    if (id <= 7 || (12 <= id && id <= 14) || (18 <= id && id <= 21)) {
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
    } else if ((8 <= id && id <= 10) || id == 15) {
      const set_value = await this.page.locator(
        "form > div:nth-child(" + id + ")>div>div>div>input"
      );
      return set_value;
    } else {
      const set_value = await this.page.locator(
        "form > div:nth-child(" + id + ")>div>div"
      );
      return set_value;
    }
  }

  async firstName() {
    const first_name = await this.invoke(2);
    await first_name.fill("updatedone" + data.Profile.first_name);
  }

  async middleName() {
    const middle_name = await this.invoke(3);
    await middle_name.fill(data.Profile.middle_name);
  }

  async lastName() {
    const last_name = await this.invoke(4);
    await last_name.fill("updated" + data.Profile.last_name);
  }

  async streetAddress() {
    const street_address = await this.invoke(5);
    await street_address.fill(data.Profile.street_address);
  }

  async city() {
    const city = await this.invoke(6);
    await city.fill(data.Profile.city);
  }

  async province() {
    const province = await this.invoke(7);
    await province.fill(data.Profile.province);
  }

  async country() {
    const country = await this.invoke(8);
    await country.clear();
    await country.type(data.Profile.country);
    await this.page
      .locator("#country-select-demo-listbox>li:nth-child(1)")
      .click();
  }

  async timezone() {
    const timezone = await this.invoke(9);
    await timezone.clear();
    await timezone.type(data.Profile.timezone);
    await this.page
      .locator("#form-select-demo-listbox>li>ul>li:nth-child(1)")
      .click();
  }

  async personalNumber() {
    const personal_number = await this.invoke(10);
    await personal_number.clear();
    await personal_number.fill(data.Profile.personal_number);
  }

  async dateOfBirth() {
    const date_of_birth = await this.invoke(12);
    await date_of_birth.clear();
    await date_of_birth.type(data.Profile.date_of_birth);
  }

  async gender() {
    const gender = await this.invoke(13);
    await gender.fill(data.Profile.gender);
  }

  async ethnicity() {
    const ethnicity = await this.invoke(14);
    await ethnicity.clear();
    await ethnicity.fill(data.Profile.ethnicity);
  }

  async citizenship() {
    const citizenship = await this.invoke(15);
    await citizenship.clear();
    await citizenship.type(data.Profile.citizenship);
    await this.page
      .locator("#country-select-demo-listbox>li:nth-child(1)")
      .click();
  }

  async maritalStatus() {
    const marital_status = await this.invoke(16);
    await marital_status.click();
    await this.dropdown_selection(1);
  }

  async activeWorkVisa() {
    const active_work_visa = await this.invoke(17);
    await active_work_visa.click();
    await this.dropdown_selection(2);
  }

  async workVisaExpireDate() {
    const work_visa_expire_date = await this.invoke(18);
    await work_visa_expire_date.fill(data.Profile.visa_expire_date);
  }

  async fatherName() {
    const father_name = await this.invoke(19);
    await father_name.fill(data.Profile.father_name);
  }

  async motherName() {
    const mother_name = await this.invoke(20);
    await mother_name.fill(data.Profile.mother_name);
  }

  async spouseName() {
    const spouse_name = await this.invoke(21);
    await spouse_name.fill(data.Profile.spouse_name);
  }

  async profilePage(id) {
    await this.myProfileTab(id);
  }
}

export class CountryDetails {
  constructor(page) {
    this.page = page;
    this.edtitCountryDetails_btn = page.locator(
      ":nth-child(4) > .MuiCardHeader-root > .MuiCardHeader-action > .MuiButtonBase-root"
    );
  }

  async editCountryDetails() {
    await expect(this.edtitCountryDetails_btn).toBeVisible();
    await this.edtitCountryDetails_btn.click();
  }

  async invoke(id) {
    if (id == 3) {
      const set_value = await this.page.locator(
        "form > div:nth-child(" + id + ")>div>div:nth-child(2)>input"
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

  async nationalTaxNumber() {
    let national_tax_number = await this.invoke(1);
    national_tax_number = await national_tax_number.last();
    await national_tax_number.fill(data.Country.national_tax_number);
  }

  async cnic() {
    const cnic = await this.invoke(2);
    await cnic.fill(data.Country.cnic);
  }

  async cnicExpireDate() {
    const cnic_expire_date = await this.invoke(3);
    await cnic_expire_date.fill(data.Country.cnic_expire_date);
  }
}

export class EmergencyDetails {
  constructor(page) {
    this.page = page;
    this.edtitEmergencyDetails_btn = page.locator(
      ":nth-child(6) > .MuiCardHeader-root > .MuiCardHeader-action > .MuiButtonBase-root"
    );
  }

  async editEmergencyDetails() {
    await expect(this.edtitEmergencyDetails_btn).toBeVisible();
    await this.edtitEmergencyDetails_btn.click();
  }

  async invoke(id) {
    if (id == 3 || id == 6) {
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

  async emergencyContactName() {
    let emergency_contact_name = await this.invoke(1);
    emergency_contact_name = await emergency_contact_name.last();
    await emergency_contact_name.fill(data.Emergency.emergency_contact_name);
  }

  async contactRelationship() {
    const contact_relationship = await this.invoke(2);
    await contact_relationship.fill(data.Emergency.contact_relationship);
  }

  async emergencyContactNumber() {
    const emergency_contact_number = await this.invoke(3);
    await emergency_contact_number.clear();
    await emergency_contact_number.fill(
      data.Emergency.emergency_contact_number
    );
  }

  async emergencyContactName2() {
    const emergency_contact_name_2 = await this.invoke(4);
    await emergency_contact_name_2.fill(
      data.Emergency.emergency_contact_name_2
    );
  }

  async contactRelationship2() {
    const contact_relationship_2 = await this.invoke(5);
    await contact_relationship_2.fill(data.Emergency.contact_relationship_2);
  }

  async emergencyContactNumber2() {
    const emergency_contact_number_2 = await this.invoke(6);
    await emergency_contact_number_2.clear();
    await emergency_contact_number_2.fill(
      data.Emergency.emergency_contact_number_2
    );
  }

  async knownConditions() {
    const known_conditions = await this.invoke(7);
    await known_conditions.fill(data.Emergency.known_conditions);
  }
}

export class HealthDetails {}
