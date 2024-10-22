const { test } = require("../../../Fixtures/pomFixture");
const { GoalsPage } = require("../../../PageObjects/Goals-and-Goals-Reporting-page");
const data = require("../../../testdata.json");
const { saveButton, success, setupBeforeAll } = require("../../../utils");
const fs = require("fs");
var webContext;
var goals;
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
  goals = new GoalsPage(page);
  await page.goto("/");
  await goals.golasPage();
  await goals.createGoalsButton();
});


test.afterAll(async () => {
  fs.unlink("state.json", () => {});
});

test.describe("Test the Goals Page as an Admin Role", () => {
  //test.describe.configure({ mode: "serial" });


  test.describe("Test the Golas Cretion ",()=>{
    test.describe.configure({ mode:"parallel" });

    test.describe("Test the Goals Cretion by Selecting the Scope 'Everyone'",()=>{
        test.describe("Test the Goals Cretion by Selecting the Gola Type 'Basic'",()=>{
            
            test("Create a Goal by selecting the Status 'Not Started'",()=>{

            })

            test("Create a Goal by selecting the Status 'In Progress'",()=>{
                
            })

            test("Create a Goal by selecting the Status 'Marked Incomplete'",()=>{
                
            })

            test("Create a Goal by selecting the Status 'Missed Due Date'",()=>{
                
            })

            test("Create a Goal by selecting the Status 'Done'",()=>{
                
            })

        });

        test.describe("Test the Goals Cretion by Selecting the Gola Type 'OKR'",()=>{
            
            test("Create a Goal by selecting the Status 'Not Started'",()=>{

            })

            test("Create a Goal by selecting the Status 'In Progress'",()=>{
                
            })

            test("Create a Goal by selecting the Status 'Marked Incomplete'",()=>{
                
            })

            test("Create a Goal by selecting the Status 'Missed Due Date'",()=>{
                
            })

            test("Create a Goal by selecting the Status 'Done'",()=>{
                
            })

        });

        test.describe("Test the Goals Cretion by Selecting the Gola Type 'KPI'",()=>{
            
            test("Create a Goal by selecting the Status 'Not Started'",()=>{

            })

            test("Create a Goal by selecting the Status 'In Progress'",()=>{
                
            })

            test("Create a Goal by selecting the Status 'Marked Incomplete'",()=>{
                
            })

            test("Create a Goal by selecting the Status 'Missed Due Date'",()=>{
                
            })

            test("Create a Goal by selecting the Status 'Done'",()=>{
                
            })

        });

        test.describe("Test the Goals Cretion by Selecting the Gola Type 'SMART'",()=>{
            
            test("Create a Goal by selecting the Status 'Not Started'",()=>{

            })

            test("Create a Goal by selecting the Status 'In Progress'",()=>{
                
            })

            test("Create a Goal by selecting the Status 'Marked Incomplete'",()=>{
                
            })

            test("Create a Goal by selecting the Status 'Missed Due Date'",()=>{
                
            })

            test("Create a Goal by selecting the Status 'Done'",()=>{
                
            })

        });

  });

    test.describe("Test the Goals Cretion by Selecting the Scope 'Department'",()=>{
    test.describe("Test the Goals Cretion by Selecting the Gola Type 'Basic'",()=>{
        
        test("Create a Goal by selecting the Status 'Not Started'",()=>{

        })

        test("Create a Goal by selecting the Status 'In Progress'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Marked Incomplete'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Missed Due Date'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Done'",()=>{
            
        })

    });

    test.describe("Test the Goals Cretion by Selecting the Gola Type 'OKR'",()=>{
        
        test("Create a Goal by selecting the Status 'Not Started'",()=>{

        })

        test("Create a Goal by selecting the Status 'In Progress'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Marked Incomplete'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Missed Due Date'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Done'",()=>{
            
        })

    });

    test.describe("Test the Goals Cretion by Selecting the Gola Type 'KPI'",()=>{
        
        test("Create a Goal by selecting the Status 'Not Started'",()=>{

        })

        test("Create a Goal by selecting the Status 'In Progress'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Marked Incomplete'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Missed Due Date'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Done'",()=>{
            
        })

    });

    test.describe("Test the Goals Cretion by Selecting the Gola Type 'SMART'",()=>{
        
        test("Create a Goal by selecting the Status 'Not Started'",()=>{

        })

        test("Create a Goal by selecting the Status 'In Progress'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Marked Incomplete'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Missed Due Date'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Done'",()=>{
            
        })

    });
  });

   test.describe("Test the Goals Cretion by Selecting the Scope 'Employee'",()=>{
    test.describe("Test the Goals Cretion by Selecting the Gola Type 'Basic'",()=>{
        
        test("Create a Goal by selecting the Status 'Not Started'",()=>{

        })

        test("Create a Goal by selecting the Status 'In Progress'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Marked Incomplete'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Missed Due Date'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Done'",()=>{
            
        })

    });

    test.describe("Test the Goals Cretion by Selecting the Gola Type 'OKR'",()=>{
        
        test("Create a Goal by selecting the Status 'Not Started'",()=>{

        })

        test("Create a Goal by selecting the Status 'In Progress'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Marked Incomplete'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Missed Due Date'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Done'",()=>{
            
        })

    });

    test.describe("Test the Goals Cretion by Selecting the Gola Type 'KPI'",()=>{
        
        test("Create a Goal by selecting the Status 'Not Started'",()=>{

        })

        test("Create a Goal by selecting the Status 'In Progress'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Marked Incomplete'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Missed Due Date'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Done'",()=>{
            
        })

    });

    test.describe("Test the Goals Cretion by Selecting the Gola Type 'SMART'",()=>{
        
        test("Create a Goal by selecting the Status 'Not Started'",()=>{

        })

        test("Create a Goal by selecting the Status 'In Progress'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Marked Incomplete'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Missed Due Date'",()=>{
            
        })

        test("Create a Goal by selecting the Status 'Done'",()=>{
            
        })

    });
  });

})
});

