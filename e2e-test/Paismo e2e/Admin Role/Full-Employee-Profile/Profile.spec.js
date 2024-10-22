const { test } = require('../../../Fixtures/pomFixture');
const data = require('../../../testdata.json');
const fs = require("fs");
const {saveButton,success,searchEmployee, profilePage, setupBeforeAll}= require('../../../utils');

const {
  ProfileDetails,
  CountryDetails,
  EmergencyDetails,
} = require("../../../PageObjects/Full-Employee-pages/Profile-page");

var webContext;
var page;
var profile;
var country;
var emergency;


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
     profile = new ProfileDetails(page);
     country = new CountryDetails(page);
     emergency = new EmergencyDetails(page), 
     await page.goto("/");
     await searchEmployee(page,"three");
     await profilePage(page);
  });



  test.describe('Test the Profile Page in the Employee Full Profile as an Admin Role', () => {
    test.describe.configure({ mode:'parallel' });





    test('Edit the Employee Profile Section', async () => {
  
        await profile.editProfile();
        //await profile.firstName();
        await profile.middleName();
        await profile.lastName();
        await profile.streetAddress();
        await profile.city();
        await profile.province();
        await profile.country();
        await profile.timezone();
        await profile.personalNumber();
        await profile.dateOfBirth();
        await profile.gender();
        await profile.ethnicity();
        await profile.citizenship();
        await profile.maritalStatus();
        await profile.activeWorkVisa();
        await profile.workVisaExpireDate();
        await profile.fatherName();
        await profile.motherName();
        await profile.spouseName();
        await saveButton(page);
        await success('Employee edited successfully!',page);
        
        
    });

    test('Edit the Employee Country Details Section', async () => {

        await country.editCountryDetails();
        await country.nationalTaxNumber();
        await country.cnic();
        await country.cnicExpireDate();
        await saveButton(page);
        await success('Employee edited successfully!',page);
    });

    test('Edit the Employee Emergency Details Section', async () => {

      await emergency.editEmergencyDetails();
      await emergency.emergencyContactName();
      await emergency.contactRelationship();
      await emergency.emergencyContactNumber();
      await emergency.emergencyContactName2();
      await emergency.contactRelationship2();
      await emergency.emergencyContactNumber2();
      await emergency.knownConditions();
      await saveButton(page);
      await success('Employee edited successfully!',page);
  });

  
  });