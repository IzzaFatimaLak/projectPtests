const { expect } = require("@playwright/test");
const data = require("../../testdata.json");
var timesheet_hours =[];
var payroll_hours=[];

export class RunPayroll {
  constructor(page) {
    this.page = page;
    this.timesheets_tab = page.getByRole('button', { name: 'Timesheets Timesheets' });
    this.runPayroll_tab= page.getByRole('button', { name: 'Run Payroll Run Payroll' });
    this.select_regular_payroll= page.getByRole('button', { name: 'Next' });
    this.run_payroll_btn=  page.getByRole('button', { name: 'Run Payroll', exact: true });
  }

  async validate() {
    await this.validation.waitFor();
    await expect(this.validation).toHaveText("Pending");
  }

  async timesheetPage() {
    await expect(this.timesheets_tab).toHaveText("Timesheets");
    await this.timesheets_tab.click();
    await expect(this.page).toHaveTitle(/.*Timesheets/);
    await expect(
      this.page.getByRole('heading', { name: 'Timesheets & Leave' })
    ).toBeVisible({ timeout: 70000 });
    await expect(
      this.page.locator('table > tbody').first()
    ).toBeVisible({timeout: 70000});
  }

 

  async timesheetHours() {
    let emp_total_hours;
    for (let emp=1; emp<=8; emp++ )
    {
        emp_total_hours= await this.page.locator('tr:nth-child('+emp+') > td:nth-child(33)').first();
        await expect(emp_total_hours).toBeVisible();
        emp_total_hours= await emp_total_hours.textContent();
        emp_total_hours= parseFloat(emp_total_hours);
        if(!isNaN(emp_total_hours))
        {
            timesheet_hours[emp]= emp_total_hours.toFixed(1);
            //console.log(timesheet_hours[emp])
        }
     }
    }


  async runPayrolPage() 
  {
    await expect(this.runPayroll_tab).toHaveText("Run Payroll");
    await this.runPayroll_tab.click();
    await expect(this.page).toHaveTitle(/.*Run Payroll/);
    await expect(this.page.getByRole('heading', { name: 'Select type of Payroll' })).toBeVisible();
  }

  async selectRegularPayroll()
    {
        await this.select_regular_payroll.click();   
    }

  async selectPayPeriod(period)
  {
    this.page.locator('.MuiFormControl-root.MuiFormControl-fullWidth.css-1laepbr>div').click();
    let pay_period= await this.page.getByRole('option', { name: ''+period+'' });
    await pay_period.click();
  }

  async runPayrollBtn()
  {
    await this.run_payroll_btn.click();
  }

  async validatePayrollHours()
  {
    let ordering= await this.page.getByRole('columnheader', { name: 'ID' }).locator('div').first();
    await expect(ordering).toBeVisible({timeout: 40000})
    await ordering.click();


    let emp_payrol_hours;
    for (let emp=1; emp<=8; emp++ )
    {
        emp_payrol_hours= await this.page.locator('tr:nth-child('+emp+') > td:nth-child(10)').first();
        await expect(emp_payrol_hours).toBeVisible();
        emp_payrol_hours= await emp_payrol_hours.textContent();
        emp_payrol_hours= parseFloat(emp_payrol_hours);
        if(!isNaN(emp_payrol_hours))
        {
            payroll_hours[emp]= emp_payrol_hours.toFixed(1);
           // console.log(payroll_hours[emp])
        }
     }
     //Compare Timesheet Hours with Payroll Hours
     timesheet_hours.every((element,index)=>element===payroll_hours[index])
     

  }
  
 

  
  







 

 
}
