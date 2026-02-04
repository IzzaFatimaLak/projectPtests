# Paismo Automation Framework – Playwright

## Overview
This project contains automated end-to-end tests for **Paismo** (https://paismo.com/), an HR and Payroll platform.  
It tests both **Admin and Employee roles**, covering features like Employee Profile, Payroll, Time-Off Requests, Offboarding, and Settings.  

## Tools & Technologies
- Playwright
- Page Object Model (POM)
- JSON files for test data
- utils.js for reusable functions
- BrowserStack / local browsers
- API testing with Postman

## Project Structure
- e2e-test/ → test scripts  
- PageObjects/ → page classes  
- Fixtures/ → test data  
- Test-Data-for-Upload/ → PDF/Excel files for upload tests  
- playwright.config.js → Playwright configuration  
- utils.js → helper functions  

## How to Run Tests
1. Clone repo: `git clone https://github.com/<your-username>/<repo-name>.git`  
2. Install dependencies: `npm install`  
3. Run all tests: `npx playwright test`  
4. Run specific tests: `npx playwright test e2e-test/<module-folder>`  
5. View reports: `npx playwright show-report`  

## Author
Izza Fatima – QA Analyst  
LinkedIn: https://www.linkedin.com/in/izza-fatima-2919191a9/
Email: izzafatimaghazanfar@gmail.com

