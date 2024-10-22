//const { page } = require('../../Fixtures/pomFixture');
const {expect}= require('@playwright/test');
const data = require('../../testdata.json');
var total;

export class DocumentManager{

    constructor(page)
    {
        this.page= page;
        this.profile_tab= page.locator('div:nth-child(1)>ul>a:nth-child(3)').first();
        this.documentManager_tab= page.locator('.MuiTabs-flexContainer.css-7sga7m> button:nth-child(4)');
        this.selectAndUpload= page.locator('input[type="file"]');
        this.upload_btn = page.getByRole('button', { name: 'Upload', exact: true });
        this.validation= page.locator('#notistack-snackbar').first();  
        this.count= page.getByTestId('DeleteIcon');
        this.confirmDelete_btn = page.locator('[role="dialog"]>div>button:nth-child(2)');
    }

    async myProfilePage()
    {
        await expect(this.profile_tab).toContainText('My Profile');
        await this.profile_tab.click();
        await expect(this.page).toHaveTitle(/.*Full Profile/);
        await expect(this.page.locator('div.MuiCardHeader-content.css-11qjisw > h4').first()).toBeVisible({timeout:50000});

    }

    async documentManagerTab()
    {
        await expect(this.documentManager_tab).toContainText('Document Manager');
        await this.documentManager_tab.click();
        await expect(this.page.locator('.MuiTypography-h3').first()).toBeVisible();

    }
    

    async selectAndUploadFile(file)
    {

        const parentElement = await this.page.$('input[type="file"]');
        // Make the parent element visible by modifying its CSS
        await this.page.evaluate((element) => {
         element.style.display = 'block'; // or 'inline', 'flex', etc. depending on its original display style
        }, parentElement);

     // Wait for the file chooser dialog to appear
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.page.locator('input[type="file"]').click();
        const fileChooser = await fileChooserPromise;
        // Set the files using the file chooser
        await fileChooser.setFiles('./Test-Data-for-Upload/'+file+'');

    }

    async selectAndUploadMultipalFiles(file1,file2,file3,file4,file5,file6)
    {

        const parentElement = await this.page.$('input[type="file"]');
        // Make the parent element visible by modifying its CSS
        await this.page.evaluate((element) => {
         element.style.display = 'block'; // or 'inline', 'flex', etc. depending on its original display style
        }, parentElement);

     // Wait for the file chooser dialog to appear
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.page.locator('input[type="file"]').click();
        const fileChooser = await fileChooserPromise;
        const path= './Test-Data-for-Upload/';
        // Set the files using the file chooser
        if (file6==5)
        {
            await fileChooser.setFiles([path+file1,path+file2,path+file3,path+file4,path+file5]);
            await this.verifyFiles();


        }
        else{

            await fileChooser.setFiles([path+file1,path+file2,path+file3,path+file4,path+file5,path+file6]);

        }


    }


   
    async uploadButton()
    {

        await expect(this.upload_btn).toHaveText('Upload');
        await this.upload_btn.click();
        await this.uploadStatus();
        
    }

    async verifyFiles()
    {
        await this.count.first().waitFor();
        total= await this.count.count();
    }

    async validate(message)
    {
      await expect(this.validation).toHaveText(message);
    }

    async uploadStatus()
    {
        await expect(this.validation).toHaveText('Documents uploaded successfully.');
         let check_tick_icon;
         for (let i=1; i<=total;i++)
        {
         check_tick_icon= this.page.locator('div > div:nth-child(1) > div> div:nth-child('+(i+1)+') > div > [data-testid="CheckCircleIcon"]');
         await check_tick_icon.waitFor();
         await expect(check_tick_icon).toBeVisible();

        }
    }

    async uploadedFiles()
    {
        await this.verifyFiles();
         let check_deleted_icon;
         for (let i=1; i<=total;i++)
        {
        check_deleted_icon= this.page.locator('div>div:nth-child('+(i+1)+')>div:nth-child(2)>button:nth-child(2)>[data-testid="DeleteIcon"]');
         await check_deleted_icon.waitFor();
         await expect(check_deleted_icon).toBeVisible();

        }
    }

    async deleteFiles(id)
    {

        if (id==1)
        {
            total=1;
        }
        else
        {
            await this.verifyFiles();
        }
       
        let delete_files;
         for (let i=1; i<=total;total--)
        {
         delete_files= this.page.locator('div>div:nth-child('+(i+1)+')>div:nth-child(2)>button:nth-child(2)>[data-testid="DeleteIcon"]');
         await delete_files.waitFor();
         await expect(delete_files).toBeVisible();
         await delete_files.click();
         await this.confirmDelete_btn.click()
         await expect(this.validation).toHaveText('Document deleted successfully');
        }

       

    }




    async offBoardingPage()
    {
        await this.myProfilePage();
        await this.offBoardingTab();
    }

    
};

