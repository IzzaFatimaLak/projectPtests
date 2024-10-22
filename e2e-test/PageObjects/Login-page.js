const { test, expect } = require('@playwright/test');
const data = require("../testdata.json");


export class LoginPage{

    constructor(page)
    {
        this.page= page;
        this.username= page.locator('#username');
        this.password= page.locator('#password');
        this.logInbuButton= page.getByRole('button', { name: 'Continue', exact: true });
        this.validation= page.locator('#error-element-password');
        this.errpr_prompt= page.locator('#prompt-alert');
    
    }

    async invalidLogin(email,password)
    {
        await this.username.fill(email);
        await this.password.fill(password)
        await this.logInbuButton.click();
        await expect(this.validation.or(this.errpr_prompt)).toBeVisible();
        if (await this.validation.isVisible())
        {
            await expect(this.validation).toContainText('Wrong email or password');
        }
        else
        {
            await expect(this.errpr_prompt).toContainText('Your account has been blocked');
        }
    }


    async validLogin(email,password)
    {
        await this.username.fill(email);
        await this.password.fill(password);
        const responsePromise = this.page.waitForResponse('**/oauth/token');
        await this.logInbuButton.click();
        const response = await responsePromise;
        const responseJson = await response.json();
        const token = responseJson.id_token;
        data.Auth.token= token;
        


        await expect(this.page).toHaveTitle(/.*Home/,{timeout:60000});
    }

    async loginFlow(email,pass)
    {
        await this.validLogin(email,pass);
    }
}
