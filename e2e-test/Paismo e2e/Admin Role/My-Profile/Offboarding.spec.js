const { test } = require('../../../Fixtures/pomFixture');
const data = require('../../../testdata.json');
const fs = require("fs");
const {saveButton,success, setupBeforeAll}= require('../../../utils');
const {OffboardingDetails} = require("../../../PageObjects/Full-Employee-pages/Offboarding-page")

var webContext;
var page;
var offBoarding;


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
    offBoarding = new OffboardingDetails(page);
    await page.goto("/");
    await offBoarding.offBoardingPage();

  });



  test.describe('Test the Offboarding Page in the My Profile as an Admin Role', () => {
    
    test('Edit the Offboarding Section', async () => {
  
      await offBoarding.editOffBoarding();
      await offBoarding.lastWorkingDate();
      await offBoarding.lastEmploymentDate();
      await offBoarding.offboardingReason();
      await offBoarding.offboardingInterviewDate();
      await offBoarding.offboardingInterviewNotes();
      await saveButton(page);
      await offBoarding.confirmButton();
      await success('Offboarding info updated Successfully',page);
        
        
    });
  
  });