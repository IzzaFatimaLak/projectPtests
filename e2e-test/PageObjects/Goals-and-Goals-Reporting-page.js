const { test, expect } = require('@playwright/test');
const data = require("../testdata.json");
var employeeId;

export class GoalsPage{

    constructor(page) {
        this.page = page;
        this.goals_tab = page.getByRole("button", {
            name: 'Goals Goals'
        });
        this.create_goals_btn = page.getByRole('button', { name: 'Create Goal' });
      }
    
      async validate() {
        const response = this.page.request;
        const apiUrl = "https://api-stg.paismo.com/work-schedules/" + shiftId + "";
        await response.delete(apiUrl, {
          headers: {
            authorization: "Bearer " + data.Auth.token + "",
          },
        });
      }
    
      async golasPage() {
        await expect(
          this.page.getByText(
            "salman.ahmad+test@paismo.comsalman.ahmad+test@paismo.comAdministrator | Paismo"
          )
        ).toBeVisible({ timeout: 30000 });
        await expect(this.goals_tab).toHaveText("Goals");
        const responsePromise = this.page.waitForResponse("**/goal?page=1&size=50&scope=Employee");
        await this.goals_tab.click();
        const response = await responsePromise;
    
        await expect(this.page).toHaveTitle(/.*Goals/);
        await expect(
          this.page.getByRole("heading", { name: "Goals" })
        ).toBeVisible({ timeout: 70000 });
      }
    
      async createGoalsButton() {
        await expect(this.create_goals_btn).toBeVisible();
        await this.create_goals_btn.click();
      }
    
    
      async dropdown_selection(id) {
        const select = await this.page.locator(
          ".MuiMenu-paper.css-1iztolx > ul > li:nth-child(" + id + ")"
        );
        await expect(select).toBeVisible();
        await select.click();
      }
    
      async invoke(id) {
        let set_value;
        if (id == 1 || id == 5) {
          set_value = await this.page.locator(
            "form > div:nth-child(" + id + ")>div>div>div"
          );
        } else {
          set_value = await this.page.locator(
            "form > div:nth-child(2)>div>div>div>input"
          );
        }
        return set_value;
      }
    
    
    
      async addDepartment(department) {
        await this.select_department.fill(department);
        await this.page.locator("//li[@id='departments-select-option-0']").click();
      }
    
    
    
    //   async doneButton() {
    //     await expect(this.done_btn).toHaveText("Done");
    //     await expect(this.done_btn).toBeEnabled();
    
    //     const responsePromise = this.page.waitForResponse("**/work-schedules");
    //     await this.done_btn.click();
    //     const response = await responsePromise;
    //     const responseJson = await response.json();
    //     if (responseJson.id) shiftId = responseJson.id;
    //   }
    
     
    
    //   async editStartTime() {
    //     const start_time = await this.invoke(4);
    //     await start_time.clear();
    //     await start_time.type(
    //       data.TimeOffRequest.start_date_time.editDate +
    //         data.TimeOffRequest.start_date_time.editTime
    //     );
    //   }
    
    
    //   async verification() {
    //     const msg = this.page.locator("#notistack-snackbar");
    //     await expect(msg).toHaveText(/Couldn't create shift: .* overlapping .*/);
    //   }
        

}

// if (!hasFetchedEmployee) {
//     const responsePromise = this.page.waitForResponse("**/employees");
//     await this.newShift_btn.click();
//     const response = await responsePromise;
//     hasFetchedEmployee = true;
//   } else {
//     await this.newShift_btn.click();
//   }