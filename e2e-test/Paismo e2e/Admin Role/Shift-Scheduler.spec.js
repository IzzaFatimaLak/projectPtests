const { test } = require("../../Fixtures/pomFixture");
const { ShiftScheduler } = require("../../PageObjects/Shift-Scheduler-page");
const data = require("../../testdata.json");
const { saveButton, success, setupBeforeAll } = require("../../utils");
const fs = require("fs");
const { createShift} = require('../../PageObjects/Multi-shift');
var webContext;
var shift;
var page;

test.beforeAll(async ({ browser }) => {
  const { setupPage, setupWebContext } = await setupBeforeAll(
    browser,
    data.Username.validEmail.admin,
    data.Password.validPassword,
    "state2.json"
  );
  page = setupPage;
  webContext = setupWebContext;
});


test.beforeEach(async () => {
  page = await webContext.newPage();
  shift = new ShiftScheduler(page);
  await page.goto("/");
  await shift.shiftSchedulerPage();
});


test.afterAll(async () => {
  fs.unlink("state.json", () => {});
});

test.describe("Test the Shift Scheduler Page as an Admin Role", () => {
  //test.describe.configure({ mode: "serial" });


  test.describe("Test the Shift Cretion Without any Start date",()=>{
    test.describe.configure({ mode:"parallel" });

    test.describe("Test the Shift Cretion by Selecting Track Time only",()=>{
    
      test("Create a Shift by selecting Track Time only", async () => {
      await shift.addNewShiftButtton();
      await shift.title("trackTime");
      await shift.startTime();
      await shift.endTime();
      await shift.repeatOn(5);
      await shift.doneButton();
      await success("Shift created successfully!",page);
      await shift.validate();
    });
  });

  test.describe("Test the Shift Cretion by Selecting the Add Work Location",()=>{
    
    test("Create a Shift by selecting No Clock-in Requirments", async () => {
    await shift.addNewShiftButtton();
    await shift.title("noRequirement");
    await shift.startTime();
    await shift.endTime();
    await shift.repeatOn(5);
    await shift.addWorkLocation();
    await shift.doneButton();
    await success("Shift created successfully!",page);
    await shift.validate();
  });


  test("Create a Shift by selecting Location Only Requirments", async () => {
    await shift.addNewShiftButtton();
    await shift.title("location");
    await shift.startTime();
    await shift.endTime();
    await shift.repeatOn(5);
    await shift.addWorkLocation(data.ShiftScheduler.clockin_type[1]);
    await shift.doneButton();
    await success("Shift created successfully!",page);
    await shift.validate();

  });

  test("Create a Shift by selecting Location+Photo Requirments", async () => {
    await shift.addNewShiftButtton();
    await shift.title("Location adn Photo");
    await shift.startTime();
    await shift.endTime();
    await shift.repeatOn(5);
    await shift.addWorkLocation(data.ShiftScheduler.clockin_type[2]);
    await shift.doneButton();
    await success("Shift created successfully!",page);
    await shift.validate();    

  });
   });

  test.describe("Test the Shift Cretion by Selecting the Add Field Location",()=>{
    
    test("Create a Shift by selecting No Clock-in Requirments", async () => {
    await shift.addNewShiftButtton();
    await shift.title("noRequirement");
    await shift.startTime();
    await shift.endTime();
    await shift.repeatOn(5);
    await shift.addFieldLocation(page,)
    await shift.doneButton();
    await success("Shift created successfully!",page);
    await shift.validate();
  });

  test("Create a Shift by selecting Location Only Requirments", async () => {
    await shift.addNewShiftButtton();
    await shift.title("location");
    await shift.startTime();
    await shift.endTime();
    await shift.repeatOn(5);
    await shift.addFieldLocation(page,data.ShiftScheduler.clockin_type[1]);
    await shift.doneButton();
    await success("Shift created successfully!",page);
    await shift.validate();

  });

  test("Create a Shift by selecting Location+Photo Requirments", async () => {
    await shift.addNewShiftButtton();
    await shift.title("Location adn Photo");
    await shift.startTime();
    await shift.endTime();
    await shift.repeatOn(5);
    await shift.addFieldLocation(page,data.ShiftScheduler.clockin_type[2]);
    await shift.doneButton();
    await success("Shift created successfully!",page);
    await shift.validate();    

  });
   });

   test.describe("Test the Overllape Shift Cretion",()=>{

    test("Should not Create a Day Overlape Shift to the same Department", async () => {
      await createShift(shift,page,"ShiftA");
      await createShift(shift,page,"ShiftB");
    });

    test("Should not Create a Night Overlape Shift to the same Department", async () => {
      await createShift(shift,page,"ShiftA","Night");
      await createShift(shift,page,"ShiftB","Night");
    });

});




})
});

// test.describe.serial("Test the Time Off Requeste Page as an Employee Role", () => {

//    test.beforeAll(async ({ browser }) => {
//     const { setupPage, setupWebContext } = await setupBeforeAll(
//       browser,
//       data.Username.validEmail.emp,
//       data.Password.validPassword,
//       "state.json"
//     );
//     page = setupPage;
//     webContext = setupWebContext;
//   });
   
//   test.beforeEach(async () => {
//     page = await webContext.newPage();
//     bookTimeOff = new TimeOffRequest(page);
//     await page.goto("/");
//     await bookTimeOff.timeOffRequestsPage();
//   });



//   test("Add Book Time Off Reequest", async () => {
//     await bookTimeOff.bookTimeOffButtton();
//     await bookTimeOff.who(true);
//     await bookTimeOff.startTime();
//     await bookTimeOff.endTime();
//     await bookTimeOff.reason();
//     await bookTimeOff.note();
//     await bookTimeOff.reviewNote();
//     await saveButton(page);
//     await bookTimeOff.confirmButton('Save');
//     await bookTimeOff.validate();
//   });

//   test("Edit the Book Time Off Request", async () => {
//     await bookTimeOff.editBookTimeOff();
//     await bookTimeOff.editStartTime();
//     await bookTimeOff.editEndTime();
//     await bookTimeOff.editReason();
//     await bookTimeOff.editNote();
//     await bookTimeOff.editReviewNote();
//     await saveButton(page);
//     await bookTimeOff.confirmButton('Save');
//   });

//   test("Canceled the Book Time Off Request", async () => {
//     await bookTimeOff.requestCanceled();
//     await bookTimeOff.confirmButton('Confirm');
//     await success("Status updated successfully!", page);
//   });
// })
