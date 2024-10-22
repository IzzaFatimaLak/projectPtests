const { test } = require("../../../Fixtures/pomFixture");
const data = require("../../../testdata.json");
const fs = require("fs");
const { searchEmployee, documentManagerPage, setupBeforeAll } = require("../../../utils");
const {
  DocumentManager,
} = require("../../../PageObjects/Full-Employee-pages/Document-Manager-page");

var webContext;
var documentManager;
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

test.afterAll(async () => {
  fs.unlink("state2.json", () => {});
});

test.beforeEach(async () => {
  page = await webContext.newPage();
  documentManager = new DocumentManager(page);
  await page.goto("/");
  await searchEmployee(page, "three");
  await documentManagerPage(page);
//   const { setupDocumentManager } = await documentManagerPage(page);
//   documentManager = setupDocumentManager;
});

test.describe("Test the Document Manager Page With Invalid Files", () => {
  test.describe.configure({ mode: "parallel" });

  test("Should Not Upload the file that exceeds the maximum allowed size.", async () => {
    await documentManager.selectAndUploadFile(
      "PDF exceeding the size limit.pdf"
    );
    await documentManager.validate(
      "Only PDF Files less then 4MB are accepted."
    );
  });

  test("Should Not Upload a file with an invalid format", async () => {
    await documentManager.selectAndUploadFile("Invalid Fromate.jpg");
    await documentManager.validate(
      "Only PDF Files less then 4MB are accepted."
    );
  });

  test("Should Not Upload More than 5 files at a Time", async () => {
    await documentManager.selectAndUploadMultipalFiles(
      "File 1.pdf",
      "File 2.pdf",
      "File 3.pdf",
      "File 4.pdf",
      "File 5.pdf",
      "File 6.pdf"
    );
    await documentManager.validate("Only up to 5 Files are accepted.");
  });
});

test.describe("Test the Document Manager Page With Files", () => {
  test.describe.configure({ mode: "serial" });

  test("Should Upload the file that is smaller than allowed size.", async () => {
    await documentManager.selectAndUploadFile("PDF with in the size limit.pdf");
    await documentManager.verifyFiles();
    await documentManager.uploadButton();
  });

  test("Verify the UI for successful upload", async () => {
    await documentManager.uploadedFiles();
  });

  test("Should Delete the Uploaded File", async () => {
    await documentManager.deleteFiles(1);
  });

  test("Shoul Upload Less than 5 files at a Time", async () => {
    await documentManager.selectAndUploadMultipalFiles(
      "File 1.pdf",
      "File 2.pdf",
      "File 3.pdf",
      "File 4.pdf",
      "File 5.pdf",
      5
    );
    await documentManager.uploadButton();
  });

  test("Should Delete a Single File and Upload a new File", async () => {
    await documentManager.deleteFiles(1);
    await documentManager.selectAndUploadFile("PDF with in the size limit.pdf");
    await documentManager.uploadButton();
    await documentManager.uploadedFiles();
  });

  test("Should Delete All the Uploaded Files", async () => {
    await documentManager.deleteFiles();
  });
});
