//const { page } = require('../../Fixtures/pomFixture');
const {expect}= require('@playwright/test');
const data = require('../../testdata.json');

export class WorkLocations{

    constructor(page)
    {
        this.page= page;
        this.addWorkLocation_btn= page.locator(':nth-child(1) > .MuiCardContent-root.css-1qw96cp > div > button');
        this.workLocation_search= page.getByPlaceholder('Search by Name').nth(1);
        this.geofence_radius= page.locator('#geoFenceRadius-select')
        this.editWorkLocation_icon= page.locator('table > tbody > tr:nth-child(1) > td:nth-child(4) > button');
        this.deleteWorkLocation_icon= page.locator('table > tbody > tr:nth-child(1) > td:nth-child(5) > button');
        this.confirmDelete_btn = page.locator('.MuiButton-textSizeMedium.css-vh7gsq');
        this.validation= page.locator(':nth-child(2) > div > div > table > tbody > tr');
    
    }

   
    async addWorkLocation()
    {
        let work_location_table= this.page.locator("table > tbody > tr:nth-child(1) > td:nth-child(4) > button");
        await expect(work_location_table).toBeVisible({timeout:50000});
        await expect(this.addWorkLocation_btn).toBeVisible();
        await this.addWorkLocation_btn.click();

    }
    
    async validate()
    {
        await expect(this.validation).toHaveCount(2);
    }
    
    async editWorkLocation()
    {
       await expect(this.editWorkLocation_icon).toBeVisible();
       await this.editWorkLocation_icon.click();

    }

    async deleteWorkLocation()
    {
       await expect(this.deleteWorkLocation_icon).toBeVisible();
       await this.deleteWorkLocation_icon.click();

    }

    async confirmDeleteButton()
    {
        await expect(this.confirmDelete_btn).toHaveText('Delete');
        await this.confirmDelete_btn.click();
    }

    async workLocationSearch()
    {
        await this.workLocation_search.fill('Sanity');
        await expect(this.page.locator('div:nth-child(2) > div > div.MuiTableContainer-root.css-kge0eu > table > tbody > tr > td:nth-child(1)')).toContainText('Sanity');
    }
       
    async invoke(id)
    {
        if (id==1 || id==6 )
       {
         const set_value= await this.page.locator('form >div:nth-child('+id+')>div>div>div>input');
         return set_value;
       }
       else
       {
         const set_value= await this.page.locator('form > div:nth-child('+id+')>div>div>div');
         return set_value;
       }
    }

    async workLocationName()
    {
      const work_location_name = await this.invoke(1);
      await work_location_name.fill(data.DepartmentWorkLocation.work_location_name);
    }

    
    async address()
    {
        const work_location_address =  await this.page.getByLabel('Address');
        await work_location_address.click();
        await work_location_address.fill(data.DepartmentWorkLocation.work_location_address);
        await this.page.getByRole('option', { name: 'Pakistan', exact: true }).click();
    }

    async clockInType()
    {
        const clockIn_type = await this.invoke(5);
        await clockIn_type.click();
        await this.page.locator('#form-select-demo-listbox>li>ul>li:nth-child(2)').click();
    }
    
    async geofenceRadius()
    {
        this.geofence_radius.click();
        const select = await this.page.locator(
            ".MuiMenu-paper.css-1iztolx > ul > li:nth-child(1)"
          );
          await expect(select).toBeVisible();
          await select.click();
    }

    async editWorkLocationName()
    {
      const work_location_name = await this.invoke(1);
      await work_location_name.fill(data.DepartmentWorkLocation.work_location_name+' Location');
    }

    
    async editAddress()
    {
        const work_location_address =  await this.page.getByLabel('Address');
        await work_location_address.click();
        await work_location_address.fill('Lahore');
        await this.page.getByRole('option', { name: 'Lahore Pakistan' }).locator('div').first().click();
    }

    async editClockInType()
    {
        const clockIn_type = await this.invoke(5);
        await clockIn_type.click();
        await this.page.locator('#form-select-demo-listbox>li>ul>li:nth-child(1)').click();
    }
    
    async editGeofenceRadius()
    {
        this.geofence_radius.click();
        const select = await this.page.locator(
            ".MuiMenu-paper.css-1iztolx > ul > li:nth-child(2)"
          );
          await expect(select).toBeVisible();
          await select.click();
    }



};


export class Departments{

    constructor(page)
    {
        this.page= page;
        this.addDepartment_btn= page.locator('.MuiBox-root.css-1bvc4cc > button');
        this.department_search= page.getByPlaceholder('Search by Name').first();
        this.editDepartment_icon= page.locator('table > tbody > tr:nth-child(1) > td:nth-child(6) > button');
        this.deleteDepartment_icon= page.locator('table > tbody > tr:nth-child(1) > td:nth-child(7) > button');
        this.confirmDelete_btn = page.locator('.MuiButton-textSizeMedium.css-vh7gsq');
        this.clear_value= page.getByRole('button', { name: 'Clear' });
        this.validation= page.locator(':nth-child(1) > div > div > table > tbody > tr');
        
    
    }

    async validate()
    {
        await expect(this.validation).toHaveCount(3);
    }

    async dropdown_selection(id)
    {
        
        const select= await this.page.locator('.MuiMenu-paper.css-1iztolx > ul > li:nth-child('+id+')');
        await expect(select).toBeVisible();
        await select.click();
    }
   
    async addDepartment()
    {
        await expect(this.addDepartment_btn).toBeVisible();
        await this.addDepartment_btn.click();

    }
    
    
    async editDepartment()
    {
       await expect(this.editDepartment_icon).toBeVisible();
       await this.editDepartment_icon.click();

    }

    async deleteDepartment()
    {
       await expect(this.deleteDepartment_icon).toBeVisible();
       await this.deleteDepartment_icon.click();

    }

    async confirmDeleteButton()
    {
        await expect(this.confirmDelete_btn).toHaveText('Delete');
        await this.confirmDelete_btn.click();
    }

    async departmentSearch()
    {
        await this.department_search.fill('Automated');
        await expect(this.page.locator('div:nth-child(1) > div > div.MuiTableContainer-root.css-kge0eu > table > tbody > tr > td:nth-child(1)')).toContainText('Automated');
    }
       
    async invoke(id)
    {
        if (id==2)
       {
         const set_value= await this.page.locator('form>div:nth-child('+id+')>div>div>input');
         return set_value;
       }
       else if(id==3)
       {
         const set_value= await this.page.locator('form > div:nth-child('+id+')>div>div'); 
         return set_value;
       }
       else
       {
         const set_value= await this.page.locator('form > div:nth-child('+id+')>div>div>div');
         return set_value;
       }
    }

    async departmentName()
    {
      const department_name = await this.invoke(2);
      await department_name.fill(data.DepartmentWorkLocation.department_name);
    }

    
    async departmentType()
    {
        const department_type = await this.invoke(3);
        await department_type.click();
        await this.dropdown_selection(1);
        
    }

    async departmentPto()
    {
        const department_pto = await this.invoke(5);
        await expect(department_pto).toHaveText('Department PTO');
        await department_pto.click();
        await this.page.locator('#ptoPolicies-select-listbox>li:nth-child(1)').click();
    }
    
    async departmentWorkLocation()
    {
        const edit_department_work_location = await this.invoke(6);
        await edit_department_work_location.click();
        await this.page.locator('#workLocations-select-listbox>li:nth-child(1)').click();
    }



    async editDepartmentName()
    {
      const edit_department_name = await this.invoke(2);
      await edit_department_name.fill(data.DepartmentWorkLocation.department_name+' Department');
    }

    async editDepartmentType()
    {
        const edit_department_type = await this.invoke(3);
        await edit_department_type.click();
        await this.dropdown_selection(2);
        
    }

    async editDepartmentPto()
    {
        const edit_department_pto = await this.invoke(5);
        await edit_department_pto.click();
        await this.clear_value.click();
        await this.page.locator('#ptoPolicies-select-listbox>li:nth-child(2)').click();
    }
    

    async editDepartmentWorkLocation()
    {
        const edit_department_work_location = await this.invoke(6);
        await edit_department_work_location.click();
        await this.page.locator('#workLocations-select-listbox>li:nth-child(1)').click();
    }

    



};


