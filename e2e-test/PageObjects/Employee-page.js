const { test, expect } = require('@playwright/test');
const data = require("../testdata.json");
var employeeId;

export class EmployeePage{

    constructor(page)
    {
        this.page= page;
        this.employee_tab= page.getByRole('button', { name: 'Employees Employees' });
        this.addEmp_btn= page.locator('[permission="employee:insert"]');
        this.contract_field= page.locator('form > div:nth-child(2)');
        this.create_btn= page.locator('form > div:nth-child(8)');
        this.success_msg= page.locator('#notistack-snackbar');

    
    }

    async employee(id,text,value)
    {
      const emp_info = await this.page.locator('form > div:nth-child('+id+')');
      await expect(emp_info).toContainText(text);
      await emp_info.click();
      await emp_info.type(value);
    }
    async employeeTab()
    {
        await expect(this.page.getByText('salman.ahmad+test@paismo.comsalman.ahmad+test@paismo.comAdministrator | Paismo')).toBeVisible({timeout:50000});
        await expect(this.employee_tab).toContainText('Employees');
        await this.employee_tab.click();
        await expect(this.page).toHaveTitle(/.*Employees/);
        // use two locators,one for without building FE
        await expect(this.page.locator('.MuiTableBody-root.css-1xnox0e').or(this.page.locator('.MuiTableBody-root.css-apqrd9-MuiTableBody-root'))).toBeVisible();

    }

    async addEmployee()
    {
       await expect(this.addEmp_btn).toBeVisible();
       await this.addEmp_btn.click();

    }


    async contractType(type)
    {
        await this.contract_field.click();
        const contract = this.page.locator('[data-value='+(type)+']');
        await expect(contract).toBeVisible();
        await contract.click();
    }

    async firstName(id,text,firstname)
    {
       await this.employee(id,text,firstname);
    }

    async lastName(id,text,lastname)
    {
       await this.employee(id,text,lastname);
    }

    async userEmail(id,text,email)
    {
        await this.employee(id,text,email);
    }

    async empStartDate(id,text,date)
    {
        await this.employee(id,text,date);
    }

    async createButton()
    {
        await expect(this.create_btn).toHaveText('Create');
        await expect(this.create_btn).toBeEnabled();

        const responsePromise = this.page.waitForResponse('**/employees');
        await this.create_btn.click();
        const response = await responsePromise;
        const responseJson = await response.json();
        employeeId = responseJson.id;
       

    }
    async success(message)
    {
        await expect(this.success_msg).toHaveText(message);
    }

    async employeePage()
    {
        await this.employeeTab();
        await this.addEmployee();
    }

    async employeeCleanUp() {
    
        const response= this.page.request;
        const apiUrl = 'https://api-stg.paismo.com/employees/'+employeeId+'';
        await response.delete(apiUrl,{headers:{
          'authorization': 'Bearer '+data.Auth.token+''}}
          );
      }


}
