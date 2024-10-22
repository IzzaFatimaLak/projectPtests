//const { page } = require('../../Fixtures/pomFixture');
const {expect}= require('@playwright/test');
const data = require('../../testdata.json');

export class WorkSchedules{

    constructor(page)
    {
        this.page= page;
        this.addWorkLocation_btn= page.locator(':nth-child(1) > .MuiCardContent-root.css-1qw96cp > div > button');
        this.workLocation_search= page.getByPlaceholder('Search by Name').nth(1);
        this.editWorkLocation_icon= page.locator('table > tbody > tr:nth-child(1) > td:nth-child(5) > button');
        this.deleteWorkLocation_icon= page.locator('table > tbody > tr:nth-child(1) > td:nth-child(6) > button');
        this.confirmDelete_btn = page.locator('.MuiButton-textSizeMedium.css-vh7gsq');
        
    
    }

   
    async addWorkLocation()
    {
        await expect(this.addWorkLocation_btn).toBeVisible();
        await this.addWorkLocation_btn.click();

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
        if (id==3 || id==8 )
       {
         const set_value= await this.page.locator('form > div:nth-child('+id+')>div>div:nth-child(2)>input');
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
      const work_location_name = await this.invoke(3);
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
        const clockIn_type = await this.invoke(7);
        await clockIn_type.click();
        await this.page.locator('#form-select-demo-listbox>li>ul>li:nth-child(2)').click();
    }
    
    async geofenceRadius()
    {
        const geofence_radius = await this.invoke(8);
        await geofence_radius.fill(data.DepartmentWorkLocation.geofence_radius);
    }

    async editWorkLocationName()
    {
      const work_location_name = await this.invoke(3);
      await work_location_name.fill(data.DepartmentWorkLocation.work_location_name+' Location');
    }

    
    async editAddress()
    {
        const work_location_address =  await this.page.getByLabel('Address');
        await work_location_address.click();
        await work_location_address.fill('Lahore');
        await this.page.getByRole('option', { name: 'Lahore Pakistan' }).click();
    }

    async editClockInType()
    {
        const clockIn_type = await this.invoke(7);
        await clockIn_type.click();
        await this.page.locator('#form-select-demo-listbox>li>ul>li:nth-child(1)').click();
    }
    
    async editGeofenceRadius()
    {
        const geofence_radius = await this.invoke(8);
        await geofence_radius.fill('2');
    }



};


export class PTO{

    constructor(page)
    {
        this.page= page;
        this.addDepartment_btn= page.locator('.MuiBox-root.css-1bvc4cc > button');
        this.department_search= page.getByPlaceholder('Search by Name').first();
        this.editDepartment_icon= page.locator('table > tbody > tr:nth-child(1) > td:nth-child(7) > button');
        this.deleteDepartment_icon= page.locator('table > tbody > tr:nth-child(1) > td:nth-child(8) > button');
        this.confirmDelete_btn = page.locator('.MuiButton-textSizeMedium.css-vh7gsq');
        this.clear_value= page.getByRole('button', { name: 'Clear' });
        
    
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
        if (id==3)
       {
         const set_value= await this.page.locator('form > div:nth-child('+id+')>div>div:nth-child(2)>input');
         return set_value;
       }
       else if(id==4)
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
      const department_name = await this.invoke(3);
      await department_name.fill(data.DepartmentWorkLocation.department_name);
    }

    
    async departmentType()
    {
        const department_type = await this.invoke(4);
        await department_type.click();
        await this.dropdown_selection(1);
        
    }

    async departmentPto()
    {
        const department_pto = await this.invoke(6);
        await department_pto.click();
        await this.page.locator('#ptoPolicies-select-listbox>li:nth-child(1)').click();
    }
    
    async departmentWorkSchedule()
    {
        const department_work_schedule = await this.invoke(7);
        await department_work_schedule.click();
        await this.page.locator('#workSchedules-select-listbox>li:nth-child(1)').click();
    }



    async editDepartmentName()
    {
      const edit_department_name = await this.invoke(3);
      await edit_department_name.fill(data.DepartmentWorkLocation.department_name+' Department');
    }

    async editDepartmentType()
    {
        const edit_department_type = await this.invoke(4);
        await edit_department_type.click();
        await this.dropdown_selection(2);
        
    }

    async editDepartmentPto()
    {
        const edit_department_pto = await this.invoke(6);
        await edit_department_pto.click();
        await this.clear_value.click();
        await this.page.locator('#ptoPolicies-select-listbox>li:nth-child(2)').click();
    }
    
    async editDepartmentWorkSchedule()
    {
        const edit_department_work_schedule = await this.invoke(7);
        await edit_department_work_schedule.click();
        await this.clear_value.click();
        await this.page.locator('#workSchedules-select-listbox>li:nth-child(2)').click();
    }

    async editDepartmentWorkLocation()
    {
        const edit_department_work_location = await this.invoke(8);
        await edit_department_work_location.click();
        await this.page.locator('#workLocations-select-listbox>li:nth-child(1)').click();
    }

    



};


