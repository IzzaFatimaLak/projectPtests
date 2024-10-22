//const { page } = require('../../Fixtures/pomFixture');
const {expect}= require('@playwright/test');
const data = require('../../testdata.json');

export class PayRollCompanyDetails{

    constructor(page)
    {
        this.page= page;
        this.edit_button = page.locator(':nth-child(3) > div.MuiCardHeader-root.css-pk1tv0 > div.MuiCardHeader-action.css-1bvkexq > button');    
    }

    
    async editButton()
    {
       await expect(this.edit_button).toBeVisible();
       await this.edit_button.click();

    }
       
    async invoke(id)
    {
        if (id==3 )
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

    async companyName()
    {
      let company_name = await this.invoke(1);
      company_name= await company_name.last();
      await company_name.fill(data.PayrollCompanyDetails.company_name);
    }

    
    async companyAddress()
    {
        const company_address =  await this.invoke(2);
        await company_address.fill(data.PayrollCompanyDetails.company_adress);
        
    }

    async companyContactNumber()
    {
        const company_contact_number = await this.invoke(3);
        await company_contact_number.clear();
        await company_contact_number.fill(data.PayrollCompanyDetails.company_contact_number);
    }
    
    async companyEmail()
    {
        const company_email = await this.invoke(4);
        await company_email.fill(data.PayrollCompanyDetails.company_email);
    }




};


export class PayrollBanking{

    constructor(page)
    {
        this.page= page;
        this.edit_button = page.locator(':nth-child(5) > div.MuiCardHeader-root.css-pk1tv0 > div.MuiCardHeader-action.css-1bvkexq > button');    
    }

    
    async editButton()
    {
       await expect(this.edit_button).toBeVisible();
       await this.edit_button.click();

    }
       
    async invoke(id)
    {
        if (id==1 )
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




    async bankCountry()
    {
        const bank_country = await this.invoke(1);
        await bank_country.clear();
        await bank_country.type(data.PayRollBankingDetail.bank_country);
        await this.page.locator('#country-select-demo-listbox>li:nth-child(1)').click();
    }


    async bankName()
    {
      const bank_name = await this.invoke(2);
      await bank_name.fill(data.PayRollBankingDetail.bank_name);
    }

    async accountHolderName()
    {
      const account_holder_name = await this.invoke(3);
      await account_holder_name.fill(data.PayRollBankingDetail.account_holder_name);
    }

    async accountNumber()
    {
      const account_number = await this.invoke(4);
      await account_number.fill(data.PayRollBankingDetail.account_number);
    }

    async bankKey()
    {
      const bank_key = await this.invoke(5);
      await bank_key.fill(data.PayRollBankingDetail.bank_key);
    }

    async branchName()
    {
      const branch_name = await this.invoke(6);
      await branch_name.fill(data.PayRollBankingDetail.branch_name);
    }
    
    async branchAddress()
    {
        const branch_address =  await this.invoke(7);
        await branch_address.fill(data.PayRollBankingDetail.branch_address);
        
    }

    async swift()
    {
      const swift = await this.invoke(8);
      await swift.fill(data.PayRollBankingDetail.swift);
    }
   




};

export class CustomPayrollFields{

    constructor(page)
    {
        this.page= page;
        this.payrollField_search= page.getByPlaceholder('Search by Name');
        this.addPayrollField_btn= page.locator('.MuiBox-root.css-1b0teq6>button');
        this.edit_button = page.locator('table > tbody > tr > td:nth-child(8) > button');  
        this.deletePayrollField_icon= page.locator('table > tbody > tr > td:nth-child(9) > button');
        this.confirmDelete_btn = page.locator('.MuiButton-textSizeMedium.css-vh7gsq'); 
        this.clear_value= page.getByRole('button', { name: 'Clear' }); 
    }



    async validate(id)
    {
      let validation= this.page.locator('#payroll-'+id+'> div > div > div > table > tbody > tr');

      if(id==0)
      {
        await expect(validation).toHaveCount(2);
      }
      else
      {
        await expect(validation).toHaveCount(1);

      }

        
    }


    async addPayrollField()
{ 
    await expect(this.addPayrollField_btn).toHaveText('Add');
    await this.addPayrollField_btn.click();

}

    async departmentTab(id)
    {
        const department_tab= await this.page.locator('#concepts-table-'+id+'');
        await department_tab.click();
    }

    async emplpoyeeTab(id)
    {
      await this.departmentTab(id);
    }
    
    async editButton()
    {
       await expect(this.edit_button).toBeVisible();
       await this.edit_button.click();

    }

    async searchPayrollField()
{
    await this.payrollField_search.fill('Sanity');
    await expect(this.page.locator('div:nth-child(1) > div > div.MuiTableContainer-root.css-kge0eu > table > tbody > tr > td:nth-child(1)')).toContainText('Sanity');

}

    async  deleteCustomPayrollField()
{
    await expect(this.deletePayrollField_icon).toBeVisible();
    await this.deletePayrollField_icon.click();

}

    async confirmDeleteButton()
{
    await expect(this.confirmDelete_btn).toHaveText('Delete');
    await this.confirmDelete_btn.click();
}
       
    async dropdown_selection(id)
    {
        
        const select= await this.page.locator('.MuiMenu-paper.css-1iztolx > ul > li:nth-child('+id+')');
        await expect(select).toBeVisible();
        await select.click();
    }

    async invoke(id)
    {
        if (id==3 || id==5)
       {
         const set_value=  await this.page.locator('form > div:nth-child('+id+')>div>div'); 
         return set_value;
       }
       else
       {
         const set_value= await this.page.locator('form > div:nth-child('+id+')>div>div:nth-child(2)>input');
         return set_value;
       }
    }


    async applyTo(id)
    {
      let apply_to = await this.invoke(3);
      apply_to= await apply_to.click();
      await this.dropdown_selection(id)
    }


    async fieldName()
    {
      let field_name = await this.invoke(4);
      await field_name.fill(data.PayrollCustomeField.field_name);
    }

    
    async fieldType()
    {
        const field_type =  await this.invoke(5);
        await field_type.click();
        await this.dropdown_selection(1);
       
        
    }

    async editfieldName()
    {
      let editfield_name = await this.invoke(4);
      await editfield_name.fill(data.PayrollCustomeField.field_name+' Field');
    }

    async startDate()
    {
      let start_date = await this.invoke(6);
      await start_date.fill(data.PayrollCustomeField.start_date);
    }

    async EndDate()
    {
      let end_date = await this.invoke(7);
      await end_date.fill(data.PayrollCustomeField.end_date);
    }


    async department(id)
    {
      let department = await this.page.locator('form > div:nth-child(4)>div>div>div');
      await  department.click();
      await this.page.locator('#departments-select-listbox>li:nth-child('+id+')').click();
    }

    async payrollField(id)
    {
      let payroll_field = await this.page.locator('form > div:nth-child(5)>div>div>div');
      await expect(payroll_field).toHaveText('Payroll Field *');
      await payroll_field.click();
      await this.page.locator('#payrollConcepts-select-listbox>li:nth-child('+id+')').click();
    }


    async editdepartment(id)
    {
      let department = await this.page.locator('form > div:nth-child(4)>div>div>div');
      await  department.click();
      await this.clear_value.click();
      await this.page.locator('#departments-select-listbox>li:nth-child('+id+')').click();
    }

    async editpayrollField(id)
    {
      let payroll_field = await this.page.locator('form > div:nth-child(5)>div>div>div');
      await payroll_field.click();
      await this.clear_value.click();
      await this.page.locator('#payrollConcepts-select-listbox>li:nth-child('+id+')').click();
    }

    async employee(id)
    {
      let employee = await this.page.locator('form > div:nth-child(4)>div>div>div');
      await expect(employee).toHaveText('Employee *');
      await  employee.click();
      await this.page.locator('#employees-select-listbox>div:nth-child('+id+')').click();
    }

    async editEmployee(id)
    {
      let edit_employee = await this.page.locator('form > div:nth-child(4)>div>div>div');
      await expect(edit_employee).toHaveText('Employee *');
      await  edit_employee.click();
      await this.clear_value.click();
      await this.page.locator('#employees-select-listbox>div:nth-child('+id+')').click();
    }
    

};



