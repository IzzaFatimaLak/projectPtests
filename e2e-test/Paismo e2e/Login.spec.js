const { test } = require('../Fixtures/pomFixture');
const data = require('../testdata.json');


test.beforeEach(async ({ page }) => {
    await page.goto('/',{ waitUntil: 'domcontentloaded' });
});

test.describe('Test Paismo login on Staging App as an Admin Role', () => {
   test.describe.configure({ mode:'parallel' });
    
   test('Should Not Login with Invalid Email Adress', async ({ login}) => {

      await login.invalidLogin(data.Username.invalidEmail.admin,data.Password.validPassword)
     
   });


   test('Should Not Login with Invalid Password', async ({login}) => {

      await login.invalidLogin(data.Username.validEmail.admin,data.Password.invalidPassword);
          
   });


   test('Should Not Login with Invalid Email and Invalid Password', async ({ login }) => {

      await login.invalidLogin(data.Username.invalidEmail.admin,data.Password.invalidPassword)   
     
   });


   test('Should be Login with Valid Email and Valid Password', async ({login}) => {

      await login.validLogin(data.Username.validEmail.admin,data.Password.validPassword)
        
   });
  
  });