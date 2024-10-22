//const { page } = require('../../Fixtures/pomFixture');
const {expect}= require('@playwright/test');
const data = require('../../testdata.json');
const {faker} = require('@faker-js/faker');

export class CompanyDetails{

    constructor(page)
    {
        this.page= page;
        this.editCompanyDetails_btn= page.locator(':nth-child(1) > div.MuiCardHeader-root> div > button');
        
    
    }

    
    async editCompanyDetails()
    {
       await expect(this.editCompanyDetails_btn).toBeVisible();
       await this.editCompanyDetails_btn.click();

    }

       
    async invoke(id)
    {
    
       if(id==3 ||id==8 || id==6)
       {
        const set_value= await this.page.locator('form > div:nth-child('+id+')>div>div>div>input');
         return set_value;
       }
       
       else
       {
        const set_value= await this.page.locator('form > div:nth-child('+id+')>div>div:nth-child(2)>input');
         return set_value;
       }
    }

    
    async editCompanyAddress()
    {
        const company_address =  await this.invoke(2);
        await company_address.fill(faker.location.streetAddress(false));
    }

    async editCompanyContactNumber()
    {
        const company_contact_number = await this.invoke(3);
        await company_contact_number.clear();
        await company_contact_number.fill(data.Profile.personal_number);
    }  
    
    async editCompanyContactEmail()
    {
        const company_contact_email =  await this.invoke(4);
        await company_contact_email.fill(faker.internet.email() );
    }

    async editTaxId()
    {
      let tax_id = await this.invoke(5);
      await tax_id.fill(faker.string.numeric(9));
    }

    async editCountryOfWork()
    {
        const country = await this.invoke(6);
        await country.clear();
        await country.type('Pakistan');
        await this.page.locator('#country-select-demo-listbox>li:nth-child(1)').click(); 
    }

    async editCompanyIndustry()
    {
        const company_industry =  await this.invoke(7);
        await company_industry.fill('Information and Communications Technology');
    }

    async timezone()
    {
        const timezone = await this.invoke(8);
        await timezone.clear();
        await timezone.type(faker.location.timeZone());
        await this.page.locator('#form-select-demo-listbox>li>ul>li:nth-child(1)').click();
    }



};


